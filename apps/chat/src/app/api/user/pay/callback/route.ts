import { NextRequest } from "next/server";
import { CallbackBody } from "@/lib/pay/xunhu";
import { OrderLogic, UserLogic, SubscriptionLogic } from "database";

function urlEncodedStringToJson(encodedString: string): Record<string, string> {
  const urlParams = new URLSearchParams(encodedString);
  const json = Object.fromEntries(urlParams.entries());
  return json;
}

export async function POST(res: NextRequest) {
  const body = urlEncodedStringToJson(await res.text());
  // const OrderStatus = await OrderDAL.checkStatus(body.trade_order_id);
  const userLogic = new UserLogic();
  const orderLogic = new OrderLogic();

  const order = await orderLogic.getOrder(body.trade_order_id);
  if (order?.status === "pending") {
    await orderLogic.updateStatus(body.trade_order_id, "paid");
  }
  const user = order!.email;

  const subscriptionLogic = new SubscriptionLogic();
  await subscriptionLogic.append(order!.email, {
    startsAt: Date.now(),
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    plan: order!.plan,
    tradeOrderId: body.trade_order_id,
  });
  return new Response("success"); // 规定返回值 不可修改
}
