import { Badge, useTheme } from "@geist-ui/core";

function renderPrices(value: any, rowData: any, rowIndex: number) {
  return JSON.stringify(value);
}

export const planColumns = [
  {
    prop: "plan",
    label: "计划",
  },
  {
    prop: "prices",
    label: "价格",
    render: renderPrices,
  },
  {
    prop: "limits",
    label: "限制",
    render: renderPrices,
  },
];
