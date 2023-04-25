import { z } from "zod";

export const unit = z.enum(["ms", "s", "m", "h", "d"]);
export type Unit = z.infer<typeof unit>;

export const duration = z.union([
  z.string().refine((value) => /^\d+\s(ms|s|m|h|d)$/.test(value), {
    message: "Invalid Duration format. Should be `${number} ${Unit}`.",
  }),
  z.string().refine((value) => /^\d+(ms|s|m|h|d)$/.test(value), {
    message: "Invalid Duration format. Should be `${number}${Unit}`.",
  }),
]);
export type Duration =
  | z.infer<typeof duration> & `${number} ${Unit}`
  | `${number}${Unit}`;

export const modelLimit = z.object({
  window: duration,
  limit: z.number().nonnegative(),
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
