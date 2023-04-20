"use client";

import { Table, Tag, Button, Checkbox, Form, Input } from "antd";

const dataSource = [
  {
    name: "Anonymous",
    passwordHash: "ffffff",
    subscriptions: [],
    createdAt: 1681114238624,
    invitationCodes: [],
    isBlocked: false,
    lastLoginAt: 1681114238624,
    resetChances: 0,
    role: "user",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (text, { isBlocked }) => (
      <a>
        {text + " "}
        {isBlocked ? <Tag color="red">已封禁</Tag> : null}
      </a>
    ),
  },
  {
    title: "订阅",
    dataIndex: "subscriptions",
    key: "subscriptions",
    render: (_, { subscriptions }) =>
      subscriptions ? (
        <Tag color="green">已订阅</Tag>
      ) : (
        <Tag color="gray">未订阅</Tag>
      ),
  },
  {
    title: "邀请码",
    dataIndex: "invitationCodes",
    key: "invitationCodes",
    render: (text) => text.join(","),
  },
  {
    title: "剩余可重置次数",
    dataIndex: "resetChances",
    key: "resetChances",
  },
  {
    title: "注册时间",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => new Date(text).toLocaleString(),
  },
  {
    title: "上次登录时间",
    dataIndex: "lastLoginAt",
    key: "lastLoginAt",
    render: (text) => new Date(text).toLocaleString(),
  },
];

const UserTable = () => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: false, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default function Page() {
  return <UserTable />;
}
