import { Ratelimit } from "@upstash/ratelimit";
import { defaultRedis } from "../redis";
import { Redis } from "@upstash/redis";
import { PlanDAL, UserDAL } from "../dal";
import { Duration } from "../types";

export class ModelRateLimiter extends Ratelimit {
  /**
   * construct a new model rate limiter by email and model provided
   * @returns null if the plan or model does not exist
   */
  static async of(
    { email, model, redis = defaultRedis }: CreateModelRateLimiterParams,
  ): Promise<ModelRateLimiter | null> {
    const userDAL = new UserDAL(redis);
    const planDAL = new PlanDAL(redis);

    const planName = email ? await userDAL.readPlan(email) ?? "free" : "free";
    const planLimit = await planDAL.readProperty(planName, "limits");
    const modelLimit = planLimit?.[model];

    if (!modelLimit) return null;

    const { limit, window } = modelLimit;
    return new ModelRateLimiter({
      redis,
      prefix: `ratelimit:${planName}:${model}`,
      limiter: Ratelimit.slidingWindow(limit, window as Duration),
    });
  }
}

export type CreateModelRateLimiterParams = {
  email?: string;
  model: string;
  redis?: Redis;
};
