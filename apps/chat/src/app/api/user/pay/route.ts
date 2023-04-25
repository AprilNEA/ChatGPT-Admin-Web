import { startPay } from "@/lib/pay/xunhu";
import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";
import { OrderLogic } from "database";
import type { Plan } from "database";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!; // pass from middleware

  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan") as Plan
  const cycle = searchParams.get("cycle")

  if (!email || !plan || !cycle) {
    return NextResponse.json({ status: ResponseStatus.Failed });
  }

  // FIXME Get price from database
  let price;
  switch (plan.trim().toLowerCase()) {
    case "pro":
      price = 15;
      break;
    case "premium":
      price = 99;
      break;
    default:
      return NextResponse.json({ status: ResponseStatus.Failed });
  }

  const order = new OrderLogic()
  const orderId = await order.newOrder({
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
