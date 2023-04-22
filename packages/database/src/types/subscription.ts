import { z } from "zod";

export const plan = z.enum(["free", "pro", "premium"]);
export type Plan = z.infer<typeof plan>;

// key: user:${email} .subscriptions
export const subscription = z.object({
  startsAt: z.number(),
  endsAt: z.number(),
  plan,
  tradeOrderId: z.string(),
});
export type Subscription = z.infer<typeof subscription>;
