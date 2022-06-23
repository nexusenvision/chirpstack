use std::collections::HashMap;
use std::net::SocketAddr;
use std::str::FromStr;
use std::time::Duration;

use anyhow::Result;
use redis::streams::StreamReadReply;
use tokio::sync::oneshot;
use tokio::task;
use tracing::{error, info, warn};
use uuid::Uuid;
use warp::{http::StatusCode, Filter, Reply};

use crate::backend::{keywrap, roaming};
use crate::downlink::data_fns;
use crate::storage::{device_session, get_redis_conn, redis_key};
use crate::uplink::{data_sns, helpers, join_sns, RoamingMetaData, UplinkFrameSet};
use crate::{config, region};
use backend::{BasePayload, MessageType};
use lrwn::region::CommonName;
use lrwn::{AES128Key, NetID};

pub async fn setup() -> Result<()> {
    let conf = config::get();
    if conf.backend_interfaces.bind.is_empty() {
        warn!("Backend interfaces API is disabled");
        return Ok(());
    }

    let addr: SocketAddr = conf.backend_interfaces.bind.parse()?;
    info!(bind = %conf.backend_interfaces.bind, "Setting up backend interfaces API");

    let routes = warp::post()
        .and(warp::body::content_length_limit(1024 * 16))
        .and(warp::body::aggregate())
        .then(handle_request);

    warp::serve(routes).run(addr).await;

    Ok(())
}

pub async fn handle_request(mut body: impl warp::Buf) -> http::Response<hyper::Body> {
    let mut b: Vec<u8> = vec![];

    while body.has_remaining() {
        b.extend_from_slice(body.chunk());
        let cnt = body.chunk().len();
        body.advance(cnt);
    }

    let bp: BasePayload = match serde_json::from_slice(&b) {
        Ok(v) => v,
        Err(e) => {
            return warp::reply::with_status(e.to_string(), StatusCode::BAD_REQUEST)
                .into_response();
        }
    };

    let sender_id = match NetID::from_str(&bp.sender_id) {
        Ok(v) => v,
        Err(e) => {
            return warp::reply::with_status(e.to_string(), StatusCode::BAD_REQUEST)
                .into_response();
        }
    };

    let resp = match bp.message_type {
        // Async responses
        MessageType::JoinAns => handle_async_ans(&bp, &b).await,
        MessageType::RejoinAns => handle_async_ans(&bp, &b).await,
        MessageType::AppSKeyAns => handle_async_ans(&bp, &b).await,
        MessageType::PRStartAns => handle_async_ans(&bp, &b).await,
        MessageType::PRStopAns => handle_async_ans(&bp, &b).await,
        MessageType::HomeNSAns => handle_async_ans(&bp, &b).await,
        MessageType::XmitDataAns => handle_async_ans(&bp, &b).await,
        // Roaming types
        MessageType::PRStartReq => handle_pr_start_req(sender_id, &b).await,
        MessageType::PRStopReq => handle_pr_stop_req(&b).await,
        MessageType::XmitDataReq => handle_xmit_data_req(&b).await,
        // Unknown message
        _ => Err(anyhow!(
            "Handler for {:?} is not implemented",
            bp.message_type
        )),
    };

    match resp {
        Ok(v) => v,
        Err(e) => {
            error!(error = %e, "Error handling request");
            warp::reply::with_status(format!("Error: {:?}", e), StatusCode::INTERNAL_SERVER_ERROR)
                .into_response()
        }
    }
}

async fn handle_pr_start_req(sender_id: NetID, b: &[u8]) -> Result<http::Response<hyper::Body>> {
    let pl: backend::PRStartReqPayload = serde_json::from_slice(b)?;
    let phy = lrwn::PhyPayload::from_slice(&pl.phy_payload)?;

    if phy.mhdr.m_type == lrwn::MType::JoinRequest {
        handle_pr_start_req_join(sender_id, pl, phy).await
    } else {
        handle_pr_start_req_data(sender_id, pl, phy).await
    }
}

async fn handle_pr_start_req_join(
    _sender_id: NetID,
    pl: backend::PRStartReqPayload,
    phy: lrwn::PhyPayload,
) -> Result<http::Response<hyper::Body>> {
    let rx_info = roaming::ul_meta_data_to_rx_info(&pl.ul_meta_data)?;
    let tx_info = roaming::ul_meta_data_to_tx_info(&pl.ul_meta_data)?;
    let region_common_name = CommonName::from_str(&pl.ul_meta_data.rf_region)?;
    let region_name = region::get_region_name(region_common_name)?;
    let dr = pl.ul_meta_data.data_rate.unwrap_or_default();

    let ufs = UplinkFrameSet {
        uplink_set_id: Uuid::new_v4(),
        dr,
        ch: helpers::get_uplink_ch(&region_name, tx_info.frequency, dr)?,
        phy_payload: phy,
        tx_info,
        rx_info_set: rx_info,
        gateway_private_map: HashMap::new(),
        gateway_tenant_id_map: HashMap::new(),
        region_common_name,
        region_name,
        roaming_meta_data: Some(RoamingMetaData {
            base_payload: pl.base.clone(),
            ul_meta_data: pl.ul_meta_data.clone(),
        }),
    };

    let res = join_sns::JoinRequest::start_pr(ufs, pl).await?;
    Ok(warp::reply::json(&res).into_response())
}

async fn handle_pr_start_req_data(
    sender_id: NetID,
    pl: backend::PRStartReqPayload,
    phy: lrwn::PhyPayload,
) -> Result<http::Response<hyper::Body>> {
    let rx_info = roaming::ul_meta_data_to_rx_info(&pl.ul_meta_data)?;
    let tx_info = roaming::ul_meta_data_to_tx_info(&pl.ul_meta_data)?;
    let region_common_name = CommonName::from_str(&pl.ul_meta_data.rf_region)?;
    let region_name = region::get_region_name(region_common_name)?;
    let dr = pl.ul_meta_data.data_rate.unwrap_or_default();

    let ufs = UplinkFrameSet {
        uplink_set_id: Uuid::new_v4(),
        dr,
        ch: helpers::get_uplink_ch(&region_name, tx_info.frequency, dr)?,
        phy_payload: phy,
        tx_info,
        rx_info_set: rx_info,
        gateway_private_map: HashMap::new(),
        gateway_tenant_id_map: HashMap::new(),
        region_common_name,
        region_name,
        roaming_meta_data: Some(RoamingMetaData {
            base_payload: pl.base.clone(),
            ul_meta_data: pl.ul_meta_data.clone(),
        }),
    };

    // get device-session
    let ds = device_session::get_for_phypayload(&ufs.phy_payload, ufs.dr, ufs.ch as u8).await?;
    let pr_lifetime = roaming::get_passive_roaming_lifetime(sender_id)?;
    let kek_label = roaming::get_passive_roaming_kek_label(sender_id)?;

    let nwk_s_key = if ds.mac_version().to_string().starts_with("1.0") {
        Some(keywrap::wrap(
            &kek_label,
            AES128Key::from_slice(&ds.nwk_s_enc_key)?,
        )?)
    } else {
        None
    };

    let f_nwk_s_int_key = if ds.mac_version().to_string().starts_with("1.0") {
        None
    } else {
        Some(keywrap::wrap(
            &kek_label,
            AES128Key::from_slice(&ds.f_nwk_s_int_key)?,
        )?)
    };

    // In case of stateless, the payload is directly handled
    if pr_lifetime.is_zero() {
        data_sns::Data::handle(ufs).await;
    }

    let ans = backend::PRStartAnsPayload {
        base: pl
            .base
            .to_base_payload_result(backend::ResultCode::Success, ""),
        dev_eui: ds.dev_eui.clone(),
        lifetime: if pr_lifetime.is_zero() {
            None
        } else {
            Some(pr_lifetime.as_secs() as usize)
        },
        f_nwk_s_int_key,
        nwk_s_key,
        f_cnt_up: Some(ds.f_cnt_up),
        ..Default::default()
    };
    Ok(warp::reply::json(&ans).into_response())
}

async fn handle_pr_stop_req(b: &[u8]) -> Result<http::Response<hyper::Body>> {
    let _pl: backend::PRStopReqPayload = match serde_json::from_slice(b) {
        Ok(v) => v,
        Err(e) => {
            return Ok(
                warp::reply::with_status(e.to_string(), StatusCode::BAD_REQUEST).into_response(),
            );
        }
    };

    unimplemented!()
}

async fn handle_xmit_data_req(b: &[u8]) -> Result<http::Response<hyper::Body>> {
    let pl: backend::XmitDataReqPayload = match serde_json::from_slice(b) {
        Ok(v) => v,
        Err(e) => {
            return Ok(
                warp::reply::with_status(e.to_string(), StatusCode::BAD_REQUEST).into_response(),
            );
        }
    };

    if let Some(ul_meta_data) = &pl.ul_meta_data {
        let rx_info = roaming::ul_meta_data_to_rx_info(ul_meta_data)?;
        let tx_info = roaming::ul_meta_data_to_tx_info(ul_meta_data)?;
        let region_common_name = CommonName::from_str(&ul_meta_data.rf_region)?;
        let region_name = region::get_region_name(region_common_name)?;
        let dr = ul_meta_data.data_rate.unwrap_or_default();
        let phy = lrwn::PhyPayload::from_slice(&pl.phy_payload)?;

        let ufs = UplinkFrameSet {
            uplink_set_id: Uuid::new_v4(),
            dr,
            ch: helpers::get_uplink_ch(&region_name, tx_info.frequency, dr)?,
            phy_payload: phy,
            tx_info,
            rx_info_set: rx_info,
            gateway_private_map: HashMap::new(),
            gateway_tenant_id_map: HashMap::new(),
            region_common_name,
            region_name,
            roaming_meta_data: Some(RoamingMetaData {
                base_payload: pl.base.clone(),
                ul_meta_data: ul_meta_data.clone(),
            }),
        };

        data_sns::Data::handle(ufs).await;
    }

    if let Some(dl_meta_data) = &pl.dl_meta_data {
        data_fns::Data::handle(pl.clone(), dl_meta_data.clone()).await?;
    }

    let ans = backend::XmitDataAnsPayload {
        base: pl
            .base
            .to_base_payload_result(backend::ResultCode::Success, ""),
    };

    Ok(warp::reply::json(&ans).into_response())
}

async fn handle_async_ans(bp: &BasePayload, b: &[u8]) -> Result<http::Response<hyper::Body>> {
    task::spawn_blocking({
        let b = b.to_vec();
        let transaction_id = bp.transaction_id;
        move || -> Result<()> {
            let mut c = get_redis_conn()?;
            let key = redis_key(format!("backend:async:{}", transaction_id));

            redis::pipe()
                .atomic()
                .cmd("XADD")
                .arg(&key)
                .arg("MAXLEN")
                .arg(1_i64)
                .arg("*")
                .arg("pl")
                .arg(&b)
                .ignore()
                .cmd("EXPIRE")
                .arg(&key)
                .arg(30_i64)
                .ignore()
                .query(&mut *c)?;

            Ok(())
        }
    })
    .await??;

    Ok(warp::reply().into_response())
}

pub async fn get_async_receiver(
    transaction_id: u32,
    timeout: Duration,
) -> Result<oneshot::Receiver<Vec<u8>>> {
    let (tx, rx) = oneshot::channel();

    task::spawn_blocking(move || -> Result<()> {
        let mut c = get_redis_conn()?;
        let key = redis_key(format!("backend:async:{}", transaction_id));

        let srr: StreamReadReply = redis::cmd("XREAD")
            .arg("BLOCK")
            .arg(timeout.as_millis() as u64)
            .arg("COUNT")
            .arg(1_u64)
            .arg("STREAMS")
            .arg(&key)
            .arg("0")
            .query(&mut *c)?;

        for stream_key in &srr.keys {
            for stream_id in &stream_key.ids {
                for (k, v) in &stream_id.map {
                    match k.as_ref() {
                        "pl" => {
                            if let redis::Value::Data(b) = v {
                                let _ = tx.send(b.to_vec());
                                return Ok(());
                            }
                        }
                        _ => {
                            error!(key = %k, "Unexpected key in async stream");
                        }
                    }
                }
            }
        }

        Ok(())
    });

    Ok(rx)
}

#[cfg(test)]
pub mod test {
    use super::*;
    use crate::test;

    #[tokio::test]
    async fn test_async_response() {
        let _guard = test::prepare().await;

        let bp = BasePayload {
            transaction_id: 1234,
            ..Default::default()
        };

        let b = vec![1, 2, 3, 4];
        handle_async_ans(&bp, &b).await.unwrap();

        let rx = get_async_receiver(1234, Duration::from_millis(100))
            .await
            .unwrap();

        let rx_b = rx.await.unwrap();
        assert_eq!(b, rx_b);
    }
}
