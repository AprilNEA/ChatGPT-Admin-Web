"use client";

import { Input, Col, Row } from "antd";
import { Card, Space } from "antd";

const { TextArea } = Input;

export default function Page() {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

      <Col className="gutter-row" span={12}>
        <Card title="公告">
          <TextArea rows={4} />
        </Card>
      </Col>

      <Col className="gutter-row" span={12}>
        <Space direction="vertical" size="middle" style={{ display: "f***REMOVED***" }}>
          <Card title="Card" size="small">
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Card" size="small">
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Card" size="small">
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </Col>

    </Row>
  );
}
