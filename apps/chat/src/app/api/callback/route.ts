import { NextRequest } from "next/server";
import { handleCallback } from "@/lib/pay/xunhu";
import { OrderLogic, SubscriptionLogic } from "database";

/**
 * This is the callback interface for processing payment platforms.
 * @constructor
 * @param req
 */
export async function POST(req: NextRequest) {
  const orderId = await handleCallback(req);
  if (!orderId) return new Response("failed");

  const orderLogic = new OrderLogic();

  // Modify order status.
  const order = await orderLogic.getOrder(orderId);

  if (order?.status === "pending") {
    await orderLogic.updateStatus(orderId, "paid");
  }
  const user = order!.email;

  // Add subscription for users.
  const subscriptionLogic = new SubscriptionLogic();
  await subscriptionLogic.append(order!.email, {
    startsAt: Date.now(),
    endsAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    plan: order!.plan,
    tradeOrderId: orderId,
  });

  return new Response("success"); // 规定返回值 不可修改
}
