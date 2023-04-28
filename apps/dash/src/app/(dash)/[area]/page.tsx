"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import { Tag } from "@geist-ui/core";
import { TableColumnRender } from "@geist-ui/core/esm/table";
import { Table, TableColumnType } from "@/components/table";

type UserItem = {
  name: string;
  passwordHash: string;
  createdAt: number;
  lastLoginAt: number;
  isBlocked: boolean;
  resetChances: number;
  inviterCode: string;
  invitationCodes: string[];
  phone: string;
  subscriptions: any;
  role: string;
};

type Area = "user" | "order";

const planRender: TableColumnRender<UserItem> = (value, _) => {
  switch (value) {
    case "free":
      return <Tag type="default">Free</Tag>;
    case "pro":
      return <Tag type="secondary">Pro</Tag>;
    case "premium":
      return <Tag type="success">Premium</Tag>;
    default:
      return <Tag type="error">Unknown</Tag>;
  }
};

const timeRender: TableColumnRender<UserItem> = (value, rowData, rowIndex) => {
  return <div>{new Date(value).toLocaleString()}</div>;
};

const userColumn: TableColumnType[] = [
  {
    prop: "name",
    label: "用户名",
  },
  {
    prop: "subscriptions",
    label: "订阅",
    render: planRender,
  },
  {
    prop: "invitationCodes",
    label: "邀请码",
    render: (value: string[], _: any) => <p>{value.join(",")}</p>,
  },
  {
    prop: "resetChances",
    label: "剩余可重置次数",
    render: (value: number, _: any) => <p>{value}</p>,
  },
  {
    prop: "createdAt",
    label: "注册时间",
    render: timeRender,
  },
  {
    prop: "lastLoginAt",
    label: "上次登录时间",
    render: timeRender,
  },
];

const orderColumns = [
  {
    prop: "order",
    label: "订单号",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    render: (text: number) => <p>{new Date(text).toLocaleString()}</p>,
  },
  {
    prop: "email",
    label: "用户邮箱",
  },
  {
    prop: "plan",
    label: "计划",
    // render: (plan: string) => getPlanTag(plan),
  },
  {
    prop: "status",
    label: "状态",
    render: (status: string) => {
      switch (status) {
        case "pending": // FIXME fix color
          return <Tag color="gold">Pending</Tag>;
        case "paid":
          return <Tag color="green">Paid</Tag>;
        default:
          return <Tag color="red">Failed</Tag>;
      }
    },
  },
  {
    prop: "totalCents",
    label: "订单金额",
  },
];

export default function Page({
  params,
}: {
  params: {
    area: Area;
  };
}) {
  const { data, isLoading } = useSWR(
    `/api/${params.area}/list` as string,
    (url) => fetcher(url).then((res) => res.json())
  );

  let columns;
  switch (params.area) {
    case "user":
      columns = userColumn;
      break;
    case "order":
      columns = orderColumns;
      break;
    default:
      return <p>404</p>;
  }

  if (isLoading) return <p>isLoading</p>;
  return <Table tableColumn={columns} tableData={data?.data?.data} />;
}
