import { startPay } from "@/lib/pay/xunhu";
import { NextRequest, NextResponse } from "next/server";
import { ResponseStatus } from "@/app/api/typing.d";
import { OrderLogic, PlanDAL } from "database";

export async function GET(req: NextRequest) {
  const email = req.headers.get("email")!; // pass from middleware

  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan")?.toLowerCase();
  const cycle = searchParams.get("cycle")?.toLowerCase();

  if (!email || !plan || !cycle) {
    return NextResponse.json({ status: ResponseStatus.Failed });
  }
  // TODO use zod here
  if (!["monthly", "quarterly", "yearly"].includes(cycle))
    return NextResponse.json({ status: ResponseStatus.Failed });
  const planDal = new PlanDAL();
  const planPrices = await planDal.readProperty(plan, "prices");
  if (!planPrices)
    // TODO Refine error types
    return NextResponse.json({ status: ResponseStatus.Failed }); // @ts-ignore
  const totalPrices = planPrices[cycle];

  const order = new OrderLogic();
  const orderId = await order.newOrder({
    createdAt: Date.now(),
    totalCents: totalPrices,
    plan,
    count: 1,
    status: "pending",
    email,
  });

  if (!orderId) throw Error("new order failed");
  return NextResponse.json(
    await startPay({
      orderId: orderId,
      price: totalPrices,
      title: `${plan} ${cycle}`,
      attach: "",
    })
  );
}
