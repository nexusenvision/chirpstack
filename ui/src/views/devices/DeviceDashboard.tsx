import React, { Component } from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import { ReloadOutlined } from "@ant-design/icons";
import { Descriptions, Space, Card, Row, Col, Tabs, Radio, RadioChangeEvent, Button } from "antd";
import { TimeUnit } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

import {
  Device,
  GetDeviceStatsRequest,
  GetDeviceStatsResponse,
  GetDeviceMetricsRequest,
  GetDeviceMetricsResponse,
} from "@chirpstack/chirpstack-api-grpc-web/api/device_pb";
import { Aggregation, Metric } from "@chirpstack/chirpstack-api-grpc-web/common/common_pb";
import { DeviceProfile } from "@chirpstack/chirpstack-api-grpc-web/api/device_profile_pb";

import DeviceStore from "../../stores/DeviceStore";
import Heatmap from "../../components/Heatmap";
import MetricChart from "../../components/MetricChart";

interface IProps {
  device: Device;
  deviceProfile: DeviceProfile;
  lastSeenAt?: Date;
}

interface IState {
  metricsAggregation: Aggregation;
  deviceMetrics: Metric[];
  linkMetricsUp?: any;
  linkMetricsErrors?: any;
  linkMetricsUpFreq: HeatmapStats[];
  linkMetricsUpDr?: any;
  linkMetricsGwRssi?: any;
  linkMetricsGwSnr?: any;
}

interface HeatmapStats {
  x: string;
  y: Array<[string, number]>;
}

class DeviceDashboard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      metricsAggregation: Aggregation.DAY,
      linkMetricsUpFreq: [],
      deviceMetrics: [],
    };
  }

  componentDidMount() {
    this.loadMetrics();
  }

  loadMetrics = () => {
    const agg = this.state.metricsAggregation;
    const end = moment();
    let start = moment();
    let format = "YYYY-MM-DD";

    if (agg === Aggregation.DAY) {
      start = start.subtract(30, "days");
    } else if (agg === Aggregation.HOUR) {
      start = start.subtract(24, "hours");
      format = "HH:mm";
    } else if (agg === Aggregation.MONTH) {
      start = start.subtract(12, "months");
      format = "YYYY-MM";
    }

    this.loadLinkMetrics(start.toDate(), end.toDate(), format, agg);
    this.loadDeviceMetrics(start.toDate(), end.toDate(), format, agg);
  }

  loadDeviceMetrics = (start: Date, end: Date, format: string, agg: Aggregation) => {
    let startPb = new Timestamp();
    let endPb = new Timestamp();

    startPb.fromDate(start);
    endPb.fromDate(end);

    let req = new GetDeviceMetricsRequest();
    req.setDevEui(this.props.device.getDevEui());
    req.setStart(startPb);
    req.setEnd(endPb);
    req.setAggregation(agg);

    DeviceStore.getMetrics(req, (resp: GetDeviceMetricsResponse) => {
      console.log(resp.toObject());
      this.setState({
        deviceMetrics: resp.getMetricsList(),
      });
    });
  }

  loadLinkMetrics = (start: Date, end: Date, format: string, agg: Aggregation) => {
    let startPb = new Timestamp();
    let endPb = new Timestamp();

    startPb.fromDate(start);
    endPb.fromDate(end);

    let req = new GetDeviceStatsRequest();
    req.setDevEui(this.props.device.getDevEui());
    req.setStart(startPb);
    req.setEnd(endPb);
    req.setAggregation(agg);

    DeviceStore.getStats(req, (resp: GetDeviceStatsResponse) => {
      let linkMetricsUp: {
        labels: string[];
        datasets: {
          label: string;
          borderColor: string;
          backgroundColor: string;
          lineTension: number;
          pointBackgroundColor: string;
          data: number[];
        }[];
      } = {
        labels: [],
        datasets: [
          {
            label: "uplink",
            borderColor: "rgba(33, 150, 243, 1)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            lineTension: 0,
            pointBackgroundColor: "rgba(33, 150, 243, 1)",
            data: [],
          },
        ],
      };

      let linkMetricsErrors: {
        labels: string[];
        datasets: {
          label: string;
          data: number[];
          backgroundColor: string;
        }[];
      } = {
        labels: [],
        datasets: [],
      };

      let linkMetricsErrorsSet: {
        [key: string]: number[];
      } = {};

      let linkMetricsUpDr: {
        labels: string[];
        datasets: {
          label: string;
          data: number[];
          backgroundColor: string;
        }[];
      } = {
        labels: [],
        datasets: [],
      };

      let linkMetricsUpDrSet: {
        [key: string]: number[];
      } = {};

      let linkMetricsGwRssiLabels: string[] = [];
      let linkMetricsGwRssiData: (number | null)[] = [];
      let linkMetricsGwRssi = {
        labels: linkMetricsGwRssiLabels,
        datasets: [
          {
            label: "rssi (reported by gateways)",
            borderColor: "rgba(33, 150, 243, 1)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            lineTension: 0,
            pointBackgroundColor: "rgba(33, 150, 243, 1)",
            data: linkMetricsGwRssiData,
          },
        ],
      };

      let linkMetricsGwSnrLabels: string[] = [];
      let linkMetricsGwSnrData: (number | null)[] = [];
      let linkMetricsGwSnr = {
        labels: linkMetricsGwSnrLabels,
        datasets: [
          {
            label: "rssi (reported by gateways)",
            borderColor: "rgba(33, 150, 243, 1)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            lineTension: 0,
            pointBackgroundColor: "rgba(33, 150, 243, 1)",
            data: linkMetricsGwSnrData,
          },
        ],
      };

      let linkMetricsUpFreq: HeatmapStats[] = [];
      for (const row of resp.getResultList()) {
        linkMetricsUp.labels.push(moment(row.getTime()!.toDate()).format(format));
        linkMetricsUp.datasets[0].data.push(row.getRxPackets());

        linkMetricsUpFreq.push({
          x: moment(row.getTime()!.toDate()).format(format),
          y: row
            .getRxPacketsPerFrequencyMap()
            .toObject()
            .map(v => [v[0].toString(), v[1]]),
        });

        linkMetricsErrors.labels.push(moment(row.getTime()!.toDate()).format(format));
        linkMetricsUpDr.labels.push(moment(row.getTime()!.toDate()).format(format));
        linkMetricsGwRssi.labels.push(moment(row.getTime()!.toDate()).format(format));
        linkMetricsGwSnr.labels.push(moment(row.getTime()!.toDate()).format(format));

        if (row.getRxPackets() !== 0) {
          linkMetricsGwRssi.datasets[0].data.push(row.getGwRssi());
          linkMetricsGwSnr.datasets[0].data.push(row.getGwSnr());
        } else {
          linkMetricsGwRssi.datasets[0].data.push(null);
          linkMetricsGwSnr.datasets[0].data.push(null);
        }

        for (const v of row.getErrorsMap().toObject()) {
          if (linkMetricsErrorsSet[v[0]] === undefined) {
            linkMetricsErrorsSet[v[0]] = [];
          }

          // fill gaps with 0s
          for (let i = linkMetricsErrorsSet[v[0]].length; i < linkMetricsErrors.labels.length - 1; i++) {
            linkMetricsErrorsSet[v[0]].push(0);
          }

          linkMetricsErrorsSet[v[0]].push(v[1]);
        }

        for (const v of row.getRxPacketsPerDrMap().toObject()) {
          if (linkMetricsUpDrSet[v[0]] === undefined) {
            linkMetricsUpDrSet[v[0]] = [];
          }

          // fill gaps with 0s
          for (let i = linkMetricsUpDrSet[v[0]].length; i < linkMetricsUpDr.labels.length - 1; i++) {
            linkMetricsUpDrSet[v[0]].push(0);
          }

          linkMetricsUpDrSet[v[0]].push(v[1]);
        }
      }

      let backgroundColors = [
        "#8bc34a",
        "#ff5722",
        "#ff9800",
        "#ffc107",
        "#ffeb3b",
        "#cddc39",
        "#4caf50",
        "#009688",
        "#00bcd4",
        "#03a9f4",
        "#2196f3",
        "#3f51b5",
        "#673ab7",
        "#9c27b0",
        "#e91e63",
      ];
      Object.entries(linkMetricsErrorsSet).forEach(([k, v]) => {
        linkMetricsErrors.datasets.push({
          label: k,
          data: v,
          backgroundColor: backgroundColors.shift()!,
        });
      });

      backgroundColors = [
        "#8bc34a",
        "#ff5722",
        "#ff9800",
        "#ffc107",
        "#ffeb3b",
        "#cddc39",
        "#4caf50",
        "#009688",
        "#00bcd4",
        "#03a9f4",
        "#2196f3",
        "#3f51b5",
        "#673ab7",
        "#9c27b0",
        "#e91e63",
      ];
      Object.entries(linkMetricsUpDrSet).forEach(([k, v]) => {
        linkMetricsUpDr.datasets.push({
          label: k,
          data: v,
          backgroundColor: backgroundColors.shift()!,
        });
      });

      this.setState({
        linkMetricsUp: linkMetricsUp,
        linkMetricsErrors: linkMetricsErrors,
        linkMetricsUpFreq: linkMetricsUpFreq,
        linkMetricsUpDr: linkMetricsUpDr,
        linkMetricsGwRssi: linkMetricsGwRssi,
        linkMetricsGwSnr: linkMetricsGwSnr,
      });
    });
  };

  onMetricsAggregationChange = (e: RadioChangeEvent) => {
    this.setState({
      metricsAggregation: e.target.value,
    }, this.loadMetrics);
  }

  render() {
    let deviceMetrics = [];
    for (let i = 0; i < this.state.deviceMetrics.length; i += 3) {
      let items = this.state.deviceMetrics.slice(i, i+3).map(v => <Col span={8}><MetricChart metric={v} aggregation={this.state.metricsAggregation} /></Col>);
      deviceMetrics.push(
        <Row gutter={24}>
          {items}
        </Row>
      );
    }

    const animation: false = false;
    const unit: TimeUnit = "day";

    const barOptions = {
      animation: animation,
      plugins: {
        legend: {
          display: true,
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          time: {
            unit: unit,
          },
        },
      },
    };

    const statsOptions = {
      animation: animation,
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          time: {
            unit: unit,
          },
        },
      },
    };

    if (this.state.linkMetricsUpDr === undefined) {
      return null;
    }

    let lastSeenAt = "Never";
    if (this.props.lastSeenAt !== undefined) {
      lastSeenAt = moment(this.props.lastSeenAt).format("YYYY-MM-DD HH:mm:ss");
    }

    const aggregations = (
      <Space direction="horizontal">
        <Radio.Group value={this.state.metricsAggregation} onChange={this.onMetricsAggregationChange} size="small">
          <Radio.Button value={Aggregation.HOUR}>24h</Radio.Button>
          <Radio.Button value={Aggregation.DAY}>31d</Radio.Button>
          <Radio.Button value={Aggregation.MONTH}>1y</Radio.Button>
        </Radio.Group>
        <Button type="primary" size="small" icon={<ReloadOutlined />} onClick={this.loadMetrics} />
      </Space>
    );

    return (
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Card>
          <Descriptions>
            <Descriptions.Item label="Last seen">{lastSeenAt}</Descriptions.Item>
            <Descriptions.Item label="Device profile">
              <Link
                to={`/tenants/${this.props.deviceProfile.getTenantId()}/device-profiles/${this.props.deviceProfile.getId()}/edit`}
              >
                {this.props.deviceProfile.getName()}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Enabled">{this.props.device.getIsDisabled() ? "no" : "yes"}</Descriptions.Item>
            <Descriptions.Item label="Description">{this.props.device.getDescription()}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Tabs tabBarExtraContent={aggregations}>
          <Tabs.TabPane tab="Link metrics" key="1">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Row gutter={24}>
                <Col span={8}>
                  <Card title="Received" className="dashboard-chart">
                    <Line height={75} options={statsOptions} data={this.state.linkMetricsUp} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Errors" className="dashboard-chart">
                    <Bar data={this.state.linkMetricsErrors} options={barOptions} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="SNR" className="dashboard-chart">
                    <Line height={75} options={statsOptions} data={this.state.linkMetricsGwSnr} />
                  </Card>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Card title="RSSI" className="dashboard-chart">
                    <Line height={75} options={statsOptions} data={this.state.linkMetricsGwRssi} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Received / frequency" className="dashboard-chart">
                    <Heatmap data={this.state.linkMetricsUpFreq} fromColor="rgb(227, 242, 253)" toColor="rgb(33, 150, 243, 1)" />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Received / DR" className="dashboard-chart">
                    <Bar data={this.state.linkMetricsUpDr} options={barOptions} />
                  </Card>
                </Col>
              </Row>
            </Space>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Device metrics" key="2">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              {deviceMetrics}
            </Space>
          </Tabs.TabPane>
        </Tabs>
      </Space>
    );
  }
}

export default DeviceDashboard;
