/**
 * This is the callback interface for Xun hu payment.
 */
import { z } from "zod";
import { NextRequest } from "next/server";

import { OrderDAL } from "@caw/dal";

import { handleCallback } from "@/app/lib/pay/xunhu";
import { getRuntime } from "@/app/utils/get-runtime";

export const runtime = getRuntime();

/**
 * This is the callback interface for processing payment platforms.
 * @constructor
 * @param req
 */
export async function POST(req: NextRequest) {
  const orderId = await handleCallback(req);
  if (!orderId) return new Response("failed");
  await OrderDAL.payOrder(z.string().parse(orderId));
  return new Response("success"); // 规定返回值 不可修改
}
