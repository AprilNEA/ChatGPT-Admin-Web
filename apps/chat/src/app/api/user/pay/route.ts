import { startPay } from "@/lib/pay/xunhu";
import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";
import { OrderDAL } from "dal";
import type { Plan } from "dal";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email");
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan") as Plan;
  if (!email || !plan)
    return NextResponse.json({ status: ResponseStatus.Failed });

  const count = Number(searchParams.get("count")) || 1;
  let price;
  switch (plan.trim().toLowerCase()) {
    case "pro":
      price = 15 * count;
      break;
    case "premium":
      price = 99 * count;
      break;
    default:
      return NextResponse.json({ status: ResponseStatus.Failed });
  }
  const orderId = await OrderDAL.newOrder({
    createdAt: Date.now(),
    totalCents: price,
    plan,
    count,
    status: "pending",
    email,
  });
  if (!orderId) throw Error("new order failed");
  return NextResponse.json(await startPay(orderId, price, email));
}
