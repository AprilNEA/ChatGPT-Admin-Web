import { z } from "zod";
import { plan } from "./subscription";

export const orderStatus = z.enum(["pending", "paid", "failed", "refunded"]);
export type OrderStatus = z.infer<typeof orderStatus>;

// key: order:${internalOrderId}
export const order = z.object({
  createdAt: z.number(),
  totalCents: z.number().nonnegative(), // 总金额
  plan, // 订阅的套餐
  count: z.number(), // 购买数量
  status: orderStatus,
  email: z.string(),
});
export type Order = z.infer<typeof order>;
