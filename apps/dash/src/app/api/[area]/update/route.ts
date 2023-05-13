import { NextRequest, NextResponse } from "next/server";
import { PlanDAL } from "database";
import { PlanItem } from "@/app/setting/typing";

type Area = "user" | "order" | "plan";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { area: Area };
  }
) {
  const data: PlanItem = await req.json();
  switch (params.area) {
    case "plan":
      const dal = new PlanDAL();
      const id = data.plan;
      delete data.plan;

      if (!id || !data) return NextResponse.json({ msg: "failed" });

      /* Ensure the type. */
      for (let key in data.prices) {
        data.prices[key] = parseInt(data.prices[key].toString(), 10);
      }
      for (let key in data.limits) {
        data.limits[key].limit = parseInt(data.limits[key].toString(), 10);
      }

      if (await dal.exists(id)) await dal.update(id, data);
      else await dal.create(id, data);

      return NextResponse.json({ msg: "ok!" });
    default:
      return NextResponse.json({}, { status: 404 });
  }
}

export const runtime = "edge";
