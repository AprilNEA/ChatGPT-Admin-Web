import { NextRequest, NextResponse } from "next/server";

import { AnalysisDAL, AnalysisLogic } from "database";

type Range = "weekly" | "monthly" | "total";

function groupUsersByCreationDate(
  creationDates: number[],
  startTimestamp: number
): Map<string, number> {
  const groupedUsers = new Map<string, number>();

  for (const date of creationDates) {
    if (date >= startTimestamp) {
      const dateString = new Date(date).toISOString().split("T")[0];

      if (groupedUsers.has(dateString)) {
        groupedUsers.set(dateString, (groupedUsers.get(dateString) ?? 0) + 1);
      } else {
        groupedUsers.set(dateString, 1);
      }
    }
  }

  return groupedUsers;
}

async function analysis() {}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { range: Range };
  }
) {
  let startTimeStamp: number = 0;
  switch (params.range) {
    case "monthly":
      startTimeStamp = Date.now() - 7 * 24 * 60 * 60 * 1000;
      break;
    case "total":
      break;
    default:
      break;
  }

  const analysisDal = new AnalysisDAL();
  const analysis = new AnalysisLogic();

  const totalUsers = await analysisDal.countTotalUsers();
  const planStatus = await analysis.countPaidCountPerPlan();
  // const groupedUsers = groupUsersByCreationDate(rawData, startTimeStamp);
  // console.log(groupedUsers);
  return NextResponse.json({
    status: 0,
    data: {
      total_users: totalUsers,
      total_orders: await analysisDal.countTotalOrders(),
      plan_status: {
        free: totalUsers - planStatus.pro - planStatus.premium,
        pro: planStatus.pro,
        premium: planStatus.premium,
      },
    },
  });
}

export const runtime = "edge";
