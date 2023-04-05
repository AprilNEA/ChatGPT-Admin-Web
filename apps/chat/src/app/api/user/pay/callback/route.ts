import { NextRequest } from "next/server";
import { CallbackBody } from "@/lib/pay/xunhu";
import { OrderDAL, UserDAL } from "dal";

function urlEncodedStringToJson(encodedString: string): Record<string, string> {
  const urlParams = new URLSearchParams(encodedString);
  const json = Object.fromEntries(urlParams.entries());
  return json;
}

export async function POST(res: NextRequest) {
  const body = urlEncodedStringToJson(await res.text());
  // const OrderStatus = await OrderDAL.checkStatus(body.trade_order_id);
  const order = await OrderDAL.getOrder(body.trade_order_id);
  if (order?.status === "pending")
    await OrderDAL.updateStatus(body.trade_order_id, "paid");
  const user = new UserDAL(order!.email);
  await user.newSubscription({
    startsAt: Date.now(),
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    plan: order!.plan,
    tradeOrderId: body.trade_order_id,
  });
  return new Response("success");
}
