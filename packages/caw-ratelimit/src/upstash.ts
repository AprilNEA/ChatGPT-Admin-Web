import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Duration, ms } from "@caw/types";

export const defaultRedis = new Redis({
  url: process.env.REDIS_URL ?? "",
  token: process.env.REDIS_TOKEN ?? "",
});

export class ModelRateLimiter extends Ratelimit {
  /**
   * construct a new model rate limiter by email and model provided
   * @returns null if the plan or model does not exist
   */
  static async create({
    userId,
    model,
    limit,
    duration /* unit is second */,
    redis = defaultRedis,
  }: CreateModelRateLimiterParams): Promise<ModelRateLimiter | null> {
    return new ModelRateLimiter({
      redis,
      userId,
      model,
      limit,
      window: `${duration}s` as Duration,
    });
  }

  #userId: string;
  #windowSize: number;
  #redis: Redis;
  #limit: number;
  #prefix: string;

  private constructor({
    redis = defaultRedis,
    userId,
    model,
    limit,
    window,
  }: ConstructModelRateLimiterParams) {
    const prefix = `ratelimit:${userId}:${model}`;

    super({
      redis,
      prefix,
      limiter: Ratelimit.slidingWindow(limit, window),
    });

    this.#userId = userId;
    this.#windowSize = ms(window);
    this.#redis = redis;
    this.#limit = limit;
    this.#prefix = prefix;
  }

  clear() {
    return this.#redis.del(`${this.#prefix}:${this.#userId}:*`);
  }
}

export type CreateModelRateLimiterParams = {
  userId: string;
  model: string;
  limit: number;
  duration: number;
  redis?: Redis;
};

type ConstructModelRateLimiterParams = {
  redis?: Redis;
  userId: string;
  model: string;
  limit: number;
  window: Duration;
};
