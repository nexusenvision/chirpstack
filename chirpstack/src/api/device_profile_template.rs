use tonic::{Request, Response, Status};

use chirpstack_api::api;
use chirpstack_api::api::device_profile_template_service_server::DeviceProfileTemplateService;

use super::auth::validator;
use super::error::ToStatus;
use super::helpers;
use super::helpers::{FromProto, ToProto};
use crate::storage::{device_profile_template, fields};

pub struct DeviceProfileTemplate {
    validator: validator::RequestValidator,
}

impl DeviceProfileTemplate {
    pub fn new(validator: validator::RequestValidator) -> Self {
        DeviceProfileTemplate { validator }
    }
}

#[tonic::async_trait]
impl DeviceProfileTemplateService for DeviceProfileTemplate {
    async fn create(
        &self,
        request: Request<api::CreateDeviceProfileTemplateRequest>,
    ) -> Result<Response<()>, Status> {
        let req_dp = match &request.get_ref().device_profile_template {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument(
                    "device_profile_template is missing",
                ));
            }
        };

        self.validator
            .validate(
                request.extensions(),
                validator::ValidateDeviceProfileTemplatesAccess::new(validator::Flag::Create),
            )
            .await?;

        let dp = device_profile_template::DeviceProfileTemplate {
            id: req_dp.id.clone(),
            name: req_dp.name.clone(),
            description: req_dp.description.clone(),
            vendor: req_dp.vendor.clone(),
            firmware: req_dp.vendor.clone(),
            region: req_dp.region().from_proto(),
            mac_version: req_dp.mac_version().from_proto(),
            reg_params_revision: req_dp.reg_params_revision().from_proto(),
            adr_algorithm_id: req_dp.adr_algorithm_id.clone(),
            payload_codec_runtime: req_dp.payload_codec_runtime().from_proto(),
            payload_codec_script: req_dp.payload_codec_script.clone(),
            flush_queue_on_activate: req_dp.flush_queue_on_activate,
            uplink_interval: req_dp.uplink_interval as i32,
            device_status_req_interval: req_dp.device_status_req_interval as i32,
            supports_otaa: req_dp.supports_otaa,
            supports_class_b: req_dp.supports_class_b,
            supports_class_c: req_dp.supports_class_c,
            class_b_timeout: req_dp.class_b_timeout as i32,
            class_b_ping_slot_period: req_dp.class_b_ping_slot_period as i32,
            class_b_ping_slot_dr: req_dp.class_b_ping_slot_dr as i16,
            class_b_ping_slot_freq: req_dp.class_b_ping_slot_freq as i64,
            class_c_timeout: req_dp.class_c_timeout as i32,
            abp_rx1_delay: req_dp.abp_rx1_delay as i16,
            abp_rx1_dr_offset: req_dp.abp_rx1_dr_offset as i16,
            abp_rx2_dr: req_dp.abp_rx2_dr as i16,
            abp_rx2_freq: req_dp.abp_rx2_freq as i64,
            tags: fields::KeyValue::new(req_dp.tags.clone()),
            ..Default::default()
        };

        device_profile_template::create(dp)
            .await
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn get(
        &self,
        request: Request<api::GetDeviceProfileTemplateRequest>,
    ) -> Result<Response<api::GetDeviceProfileTemplateResponse>, Status> {
        let req = request.get_ref();

        self.validator
            .validate(
                request.extensions(),
                validator::ValidateDeviceProfileTemplateAccess::new(validator::Flag::Read, &req.id),
            )
            .await?;

        let dp = device_profile_template::get(&req.id)
            .await
            .map_err(|e| e.status())?;

        Ok(Response::new(api::GetDeviceProfileTemplateResponse {
            device_profile_template: Some(api::DeviceProfileTemplate {
                id: dp.id.to_string(),
                name: dp.name,
                description: dp.description,
                vendor: dp.vendor,
                firmware: dp.firmware,
                region: dp.region.to_proto().into(),
                mac_version: dp.mac_version.to_proto().into(),
                reg_params_revision: dp.reg_params_revision.to_proto().into(),
                adr_algorithm_id: dp.adr_algorithm_id,
                payload_codec_runtime: dp.payload_codec_runtime.to_proto().into(),
                payload_codec_script: dp.payload_codec_script,
                flush_queue_on_activate: dp.flush_queue_on_activate,
                uplink_interval: dp.uplink_interval as u32,
                device_status_req_interval: dp.device_status_req_interval as u32,
                supports_otaa: dp.supports_otaa,
                supports_class_b: dp.supports_class_b,
                supports_class_c: dp.supports_class_c,
                class_b_timeout: dp.class_c_timeout as u32,
                class_b_ping_slot_period: dp.class_b_ping_slot_period as u32,
                class_b_ping_slot_dr: dp.class_b_ping_slot_dr as u32,
                class_b_ping_slot_freq: dp.class_b_ping_slot_freq as u32,
                class_c_timeout: dp.class_c_timeout as u32,
                abp_rx1_delay: dp.abp_rx1_delay as u32,
                abp_rx1_dr_offset: dp.abp_rx1_dr_offset as u32,
                abp_rx2_dr: dp.abp_rx2_dr as u32,
                abp_rx2_freq: dp.abp_rx2_freq as u32,
                tags: dp.tags.into_hashmap(),
            }),
            created_at: Some(helpers::datetime_to_prost_timestamp(&dp.created_at)),
            updated_at: Some(helpers::datetime_to_prost_timestamp(&dp.updated_at)),
        }))
    }

    async fn update(
        &self,
        request: Request<api::UpdateDeviceProfileTemplateRequest>,
    ) -> Result<Response<()>, Status> {
        let req_dp = match &request.get_ref().device_profile_template {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument(
                    "device_profile_template is missing",
                ));
            }
        };

        self.validator
            .validate(
                request.extensions(),
                validator::ValidateDeviceProfileTemplateAccess::new(
                    validator::Flag::Update,
                    &req_dp.id,
                ),
            )
            .await?;

        device_profile_template::update(device_profile_template::DeviceProfileTemplate {
            id: req_dp.id.clone(),
            name: req_dp.name.clone(),
            description: req_dp.description.clone(),
            vendor: req_dp.vendor.clone(),
            firmware: req_dp.firmware.clone(),
            region: req_dp.region().from_proto(),
            mac_version: req_dp.mac_version().from_proto(),
            reg_params_revision: req_dp.reg_params_revision().from_proto(),
            adr_algorithm_id: req_dp.adr_algorithm_id.clone(),
            payload_codec_runtime: req_dp.payload_codec_runtime().from_proto(),
            payload_codec_script: req_dp.payload_codec_script.clone(),
            flush_queue_on_activate: req_dp.flush_queue_on_activate,
            uplink_interval: req_dp.uplink_interval as i32,
            device_status_req_interval: req_dp.device_status_req_interval as i32,
            supports_otaa: req_dp.supports_otaa,
            supports_class_b: req_dp.supports_class_b,
            supports_class_c: req_dp.supports_class_c,
            class_b_timeout: req_dp.class_b_timeout as i32,
            class_b_ping_slot_period: req_dp.class_b_ping_slot_period as i32,
            class_b_ping_slot_dr: req_dp.class_b_ping_slot_dr as i16,
            class_b_ping_slot_freq: req_dp.class_b_ping_slot_freq as i64,
            class_c_timeout: req_dp.class_c_timeout as i32,
            abp_rx1_delay: req_dp.abp_rx1_delay as i16,
            abp_rx1_dr_offset: req_dp.abp_rx1_dr_offset as i16,
            abp_rx2_dr: req_dp.abp_rx2_dr as i16,
            abp_rx2_freq: req_dp.abp_rx2_freq as i64,
            tags: fields::KeyValue::new(req_dp.tags.clone()),
            ..Default::default()
        })
        .await
        .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn delete(
        &self,
        request: Request<api::DeleteDeviceProfileTemplateRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        self.validator
            .validate(
                request.extensions(),
                validator::ValidateDeviceProfileTemplateAccess::new(
                    validator::Flag::Delete,
                    &req.id,
                ),
            )
            .await?;

        device_profile_template::delete(&req.id)
            .await
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn list(
        &self,
        request: Request<api::ListDeviceProfileTemplatesRequest>,
    ) -> Result<Response<api::ListDeviceProfileTemplatesResponse>, Status> {
        let req = request.get_ref();

        self.validator
            .validate(
                request.extensions(),
                validator::ValidateDeviceProfileTemplatesAccess::new(validator::Flag::List),
            )
            .await?;

        let count = device_profile_template::get_count()
            .await
            .map_err(|e| e.status())?;

        let items = device_profile_template::list(req.limit as i64, req.offset as i64)
            .await
            .map_err(|e| e.status())?;

        Ok(Response::new(api::ListDeviceProfileTemplatesResponse {
            total_count: count as u32,
            result: items
                .iter()
                .map(|dp| api::DeviceProfileTemplateListItem {
                    id: dp.id.to_string(),
                    created_at: Some(helpers::datetime_to_prost_timestamp(&dp.created_at)),
                    updated_at: Some(helpers::datetime_to_prost_timestamp(&dp.updated_at)),
                    name: dp.name.clone(),
                    vendor: dp.vendor.clone(),
                    firmware: dp.firmware.clone(),
                    region: dp.region.to_proto().into(),
                    mac_version: dp.mac_version.to_proto().into(),
                    reg_params_revision: dp.reg_params_revision.to_proto().into(),
                    supports_otaa: dp.supports_otaa,
                    supports_class_b: dp.supports_class_b,
                    supports_class_c: dp.supports_class_c,
                })
                .collect(),
        }))
    }
}
