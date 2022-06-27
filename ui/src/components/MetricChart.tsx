import React, { Component } from "react";

import { Card, Empty } from "antd";

import { TimeUnit } from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { Metric, Aggregation } from "@chirpstack/chirpstack-api-grpc-web/common/common_pb";

interface IProps {
  metric: Metric;
  aggregation: Aggregation;
}


class MetricChart extends Component<IProps> {
  render() {
    if (this.props.metric.getTimestampsList().length === 0 || this.props.metric.getDatasetsList().length === 0) {
      return <Empty />;
    }

    let unit: TimeUnit = "hour";
    let format = "HH:mm";
    if (this.props.aggregation === Aggregation.DAY) {
      unit = "day";
      format = "YYYY-MM-DD";
    } else if (this.props.aggregation === Aggregation.MONTH) {
      unit = "month";
      format = "YYYY-MM";
    }

    const animation: false = false;

    const options = {
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

    let chartData = {
      labels: this.props.metric.getTimestampsList().map(v => moment(v.toDate()).format(format)),
      datasets: this.props.metric.getDatasetsList().map(v => {
        return {
            label: v.getLabel(),
            borderColor: "rgba(33, 150, 243, 1)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            lineTension: 0,
            pointBackgroundColor: "rgba(33, 150, 243, 1)",
            data: v.getDataList(),
        };
      }),
    };

    return(
      <Card title={this.props.metric.getName()} className="dashboard-chart">
        <Line height={75} options={options} data={chartData} />
      </Card>
    );
  }
}

export default MetricChart;
