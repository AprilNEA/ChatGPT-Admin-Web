import { NextRequest, NextResponse } from "next/server";
import { ChatRequest } from "@caw/types";
import { OrderDAL } from "@caw/dal";
import { startPay } from "@/app/lib/pay/xunhu";
import { getRuntime } from "@/app/utils/get-runtime";
import { serverErrorCatcher } from "@/app/api/catcher";
import { gerUserId } from "@/app/api/utils";

export const runtime = getRuntime();

export const POST = serverErrorCatcher(async (req: NextRequest) => {
  const userId = await gerUserId(req);
  const { planId, priceId } = await ChatRequest.RequestNewOrder.parseAsync(
    await req.json(),
  );

  const order = await OrderDAL.newOrder({
    userId,
    planId,
    priceId,
    count: 1,
  });
  //
  return NextResponse.json(
    await startPay({
      orderId: order.orderId.toString(),
      price: order.amount,
      title: "机器人对话付费购买",
      attach: "",
    }),
  );
});
