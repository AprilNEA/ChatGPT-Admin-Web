const rateLimitProvider = process.env.RATELIMIT_PROVIDER!;

export async function rateLimit(
  userId: string,
  model: string,
  limit: number,
  duration: number
): Promise<boolean> {
  switch (rateLimitProvider.toLowerCase()) {
    case "upstash": {
      const limiter = await (
        await import("./upstash")
      ).ModelRateLimiter.create({
        userId,
        model,
        limit,
        duration,
      });
      return (await limiter?.limit("chat"))?.success ?? false;
    }
    default:
      return true;
  }
}
