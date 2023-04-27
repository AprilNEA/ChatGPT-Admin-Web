import { NextRequest, NextResponse } from "next/server";

import { UserDAL } from "database";

type Range = "yesterday" | "total";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { range: Range };
  },
) {
  //
  switch (params.range) {
    case "yesterday":
      break;
    case "total":
      break;
    default:
      break;
  }
  return NextResponse.json({
    status: 0,
    data: {
      user: 0,
      paid: null, // [plan_name]: count
      order: 0, // including pending
    },
  });
}

export const config = {
  runtime: "edge",
};
