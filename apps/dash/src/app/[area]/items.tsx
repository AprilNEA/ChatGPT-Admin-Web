import { Badge, useTheme } from "@geist-ui/core";
import { TableColumnRender } from "@geist-ui/core/esm/table";
import { TableColumnType } from "@/components/table";

import { UserItem } from "./typing";

const planRender: TableColumnRender<UserItem> = (value, _) => {
  const theme = useTheme();
  let plan = "free";
  /**
   * FIXME Assuming the subscriptions are arranged in order, the number of times is:
   */
  if (value.length > 0) {
    if (value[value.length - 1].endsAt > Date.now())
      plan = value[value.length - 1].plan;
  }

  switch (plan) {
    case "free":
      return (
        <Badge style={{ backgroundColor: theme.palette.successLight }}>
          Free
        </Badge>
      );
    case "pro":
      return (
        <Badge style={{ backgroundColor: theme.palette.purple }}>Pro</Badge>
      );
    case "premium":
      return (
        <Badge
          style={{
            backgroundColor: theme.palette.cyanLighter,
            color: theme.palette.foreground,
          }}
        >
          Premium
        </Badge>
      );
    default:
      return (
        <Badge style={{ backgroundColor: theme.palette.alert }}>
          {JSON.stringify(value)}
        </Badge>
      );
  }
};

const timeRender: TableColumnRender<UserItem> = (value, rowData, rowIndex) => {
  return (
    <div style={{ fontFamily: "monospace" }}>
      {new Date(value).toLocaleString("zh-CN")}
    </div>
  );
};

export const userColumn: TableColumnType[] = [
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

export const orderColumns = [
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
      const theme = useTheme();

      switch (status) {
        case "pending": // FIXME fix color
          return <Badge style={{ backgroundColor: "#ffd700" }}>Pending</Badge>;
        case "paid":
          return <Badge style={{ backgroundColor: "#ffd700" }}>Paid</Badge>;
        default:
          return <Badge style={{ backgroundColor: "#ffd700" }}>Failed</Badge>;
      }
    },
  },
  {
    prop: "totalCents",
    label: "订单金额",
  },
];
