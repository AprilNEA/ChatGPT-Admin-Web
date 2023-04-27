"use client";

import useSWR from "swr";
import {ChangeEvent, useState} from "react";
import {Table, Tag, Button, Form, Input} from "antd";
import fetcher from "@/utils/fetcher";
import {User} from "database";

type Area = "user" | "order"
const {Search} = Input;

const getPlanTag = (plan: string) => {
  switch (plan) {
    case "free":
      return <Tag color="gray">Free</Tag>
    case "pro":
      return <Tag color="green">Pro</Tag>
    case "premium":
      return <Tag color="gold">Premium</Tag>
    default:
      return <Tag color="yellow">Unknown</Tag>
  }
}

const orderColumns = [
  {
    title: "订单号",
    dataIndex: "order",
    key: "order"
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: number) => new Date(text).toLocaleString(),
  },
  {
    title: "用户邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "计划",
    dataIndex: "plan",
    key: "plan",
    render: (plan: string) => getPlanTag(plan)
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      switch (status) {
        case "pending":
          return <Tag color="gold">Pending</Tag>
        case "paid":
          return <Tag color="green">Paid</Tag>
        default:
          return <Tag color="red">Failed</Tag>
      }
    }
  },
  {
    title: "订单金额",
    dataIndex: "totalCents",
    key: "totalCents"
  }
]

const userColumns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (text: string, {isBlocked}: { isBlocked: boolean }) => (
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
    render: (_: any, {subscriptions}: { subscriptions: any }) =>
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
    render: (text: string[]) => text.join(","),
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
    render: (text: number) => new Date(text).toLocaleString(),
  },
  {
    title: "上次登录时间",
    dataIndex: "lastLoginAt",
    key: "lastLoginAt",
    render: (text: number) => new Date(text).toLocaleString(),
  },
];

export default function Page({params}: { params: { area: Area } }) {
  let columns
  switch (params.area) {
    case "user":
      columns = userColumns
      break
    case "order":
      columns = orderColumns
      break
    default:
      return <p>404</p>
  }
  const {data, isLoading} = useSWR(
    `/api/${params.area}/list` as string,
    (url) =>
      fetcher(url).then((res) => res.json())
  );

  const [searchEmail, setSearchEmail] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchEmail(e.target.value);
    console.log(e.target.value)
  }

  function handlerSubmit(e: SubmitEvent) {
    console.log(searchEmail)
  }

  if (isLoading) return <p>isLoading</p>
  return (
    <>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={handlerSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[{required: false, message: "Please input your username!"}]}
        >
          <Input value={searchEmail} onChange={handleChange}/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      {/*@ts-ignore*/}
      <Table dataSource={data?.data?.data} columns={columns}/>
    </>
  );
}
