import { z } from "zod";

// key: redeem:${code}
export const redeem = z.object({
  createdAt: z.number(),
  plan: z.string(),
  count: z.number(),
  activated: z.object({
    byEmail: z.string(),
    at: z.number(),
  }).optional(),
});

export type Redeem = z.infer<typeof redeem>;
