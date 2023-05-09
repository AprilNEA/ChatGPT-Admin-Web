"use client";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 300, 0, 400, 300, 100, 200, 100],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [0, 300, 0, 400, 300, 100, 200, 100],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function UserAnalysisTable() {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "注册用户",
        data: [200, 100, 300, 400, 600, 700],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
      },
      {
        fill: true,
        label: "付费用户",
        data: [20, 10, 30, 40, 60, 70],
        borderColor: "rgb(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };
  return (
    <Line
      data={data}
      width={400}
      height={300}
      options={{ maintainAspectRatio: false }}
    />
  );
}

export function PlanStatus(props: {
  freeCount: number;
  proCount: number;
  premiumCount: number;
}) {
  const data = {
    labels: ["Free", "Pro", "Premium"],
    datasets: [
      {
        label: "Number of users",
        data: [props.freeCount, props.proCount, props.premiumCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={data}
      width={400}
      height={300}
      options={{ maintainAspectRatio: false }}
    />
  );
}
