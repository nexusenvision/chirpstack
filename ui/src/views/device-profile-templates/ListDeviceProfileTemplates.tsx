import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Space, Breadcrumb, Button, PageHeader } from "antd";
import { ColumnsType } from "antd/es/table";

import {
  ListDeviceProfileTemplatesRequest,
  ListDeviceProfileTemplatesResponse,
  DeviceProfileTemplateListItem,
} from "@chirpstack/chirpstack-api-grpc-web/api/device_profile_template_pb";
import { Region } from "@chirpstack/chirpstack-api-grpc-web/common/common_pb";

import { getEnumName } from "../helpers";
import DataTable, { GetPageCallbackFunc } from "../../components/DataTable";
import DeviceProfileTemplateStore from "../../stores/DeviceProfileTemplateStore";

class ListDeviceProfileTemplates extends Component {
  columns = (): ColumnsType<DeviceProfileTemplateListItem.AsObject> => {
    return [
      {
        title: "Vendor",
        dataIndex: "vendor",
        key: "vendor",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, record) => <Link to={`/device-profile-templates/${record.id}/edit`}>{text}</Link>,
      },
      {
        title: "Firmware",
        dataIndex: "firmware",
        key: "firmware",
      },
      {
        title: "Region",
        dataIndex: "region",
        key: "region",
        width: 150,
        render: (text, record) => {
          return getEnumName(Region, record.region);
        },
      },
    ];
  };

  getPage = (limit: number, offset: number, callbackFunc: GetPageCallbackFunc) => {
    let req = new ListDeviceProfileTemplatesRequest();
    req.setLimit(limit);
    req.setOffset(offset);

    DeviceProfileTemplateStore.list(req, (resp: ListDeviceProfileTemplatesResponse) => {
      const obj = resp.toObject();
      callbackFunc(obj.totalCount, obj.resultList);
    });
  };

  render() {
    return (
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <PageHeader
          breadcrumbRender={() => (
            <Breadcrumb>
              <Breadcrumb.Item>
                <span>Network Server</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Device-profile templates</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
          title="Device-profile templates"
          extra={[
            <Button type="primary">
              <Link to={`/device-profile-templates/create`}>Add device-profile template</Link>
            </Button>,
          ]}
        />
        <DataTable columns={this.columns()} getPage={this.getPage} rowKey="id" />
      </Space>
    );
  }
}

export default ListDeviceProfileTemplates;
