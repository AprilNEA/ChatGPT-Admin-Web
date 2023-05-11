"use client";

import styles from "./table.module.scss";
import { SubscribeType } from "@/store/user/typing";

function renderDate(timestamp: number): string {
  const date = new Date(timestamp); // JavaScript使用的是毫秒级时间戳，所以需要乘以1000
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() 返回的月份从0开始
  const day = date.getDate(); // getDate() 返回的是月份中的日期

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

function renderPlan(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function SubscribeTable(props: { data: SubscribeType[] }) {
  if (props.data.length == 0) return <></>;

  return (
    <table className={styles["table"]}>
      <thead>
        <tr>
          <th>订单号</th>
          <th>开始日期</th>
          <th>截止日期</th>
          <th>订阅计划</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr key={index}>
            <td>{row.tradeOrderId}</td>
            <td>{renderDate(row.startsAt)}</td>
            <td>{renderDate(row.endsAt)}</td>
            <td>{renderPlan(row.plan)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
