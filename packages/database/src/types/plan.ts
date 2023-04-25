import { z } from "zod";

export const modelLimit = z.object({
  windowMs: z.number().nonnegative(),
  maxCount: z.number(), // -1 for unlimited
});
export type ModelLimit = z.infer<typeof modelLimit>;

// key: plan:${planName}
export const plan = z.object({
  prices: z.object({
    monthly: z.number().nonnegative(),
    quarterly: z.number().nonnegative(),
    yearly: z.number().nonnegative(),
  }),
  limits: z.record(modelLimit),
});
export type Plan = z.infer<typeof plan>;
