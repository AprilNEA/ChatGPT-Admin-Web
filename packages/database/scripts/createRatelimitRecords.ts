import { keywordRateLimiterOf, ModelRateLimiter } from "../src";
import { testRedis } from "../tests/client";

(async () => {
  const limiter = keywordRateLimiterOf({
    prefix: "test",
    limit: 10,
    window: "5m",
    redis: testRedis,
  });

  console.log(await limiter.limit("me"));
  console.log(await limiter.limit("me"));
  console.log(await limiter.limit("me"));
})();
