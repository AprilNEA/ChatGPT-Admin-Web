import { NextRequest, NextResponse } from "next/server";
import { ChatRequest } from "@caw/types";
import { OrderDAL } from "@caw/dal";
import { startPay } from "@/lib/pay/xunhu";
import { getRuntime } from "@/utils";

export const runtime = getRuntime();

export async function GET(req: NextRequest) {
  const userId = Number(req.headers.get("userId")!); /* pass from middleware */
  const { planId } = await ChatRequest.RequestNewOrder.parseAsync(
    await req.json()
  );

  const order = await OrderDAL.newOrder({
    userId,
    planId,
    amount: 1,
    count: 1,
  });
  //
  // return NextResponse.json(
  //   await startPay({
  //     orderId: order.orderId,
  //     price: totalPrices,
  //     title: `${plan} ${cycle}`,
  //     attach: "",
  //   })
  // );
}
