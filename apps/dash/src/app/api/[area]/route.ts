import { NextRequest, NextResponse } from "next/server";

import { OrderDAL, UserDAL, PlanDAL } from "database";

type Area = "user" | "order" | "plan";

type DAL = UserDAL | OrderDAL | PlanDAL;

async function Query(req: NextRequest, dal: DAL) {
  const searchParams = req.nextUrl.searchParams;
  const queryKey = searchParams.get("key") ?? "";
  const cursor = Number(searchParams.get("cursor")) ?? 0;
  const count = Number(searchParams.get("count")) ?? 10;

  const [nextCursor, keys] = await dal.scanKeys(queryKey, cursor, count);

  const values = await dal.listValuesOfKeys(...keys);
  const data = keys.map((k, i) => ({
    ...values[i],
    [dal.namespace.slice(0, -1)]: k.slice(dal.namespace.length),
  }));

  return NextResponse.json({
    status: 0,
    data: {
      next_cursor: nextCursor,
      count: data.length,
      data,
    },
  });
}

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { area: Area };
  }
) {
  let dal: DAL;
  switch (params.area) {
    case "order":
      dal = new OrderDAL();
      break;
    case "user":
      dal = new UserDAL();
      break;
    case "plan":
      dal = new PlanDAL();
      break;
    default:
      return NextResponse.json({}, { status: 404 });
  }

  return await Query(req, dal);
}

export const runtime = "edge";
