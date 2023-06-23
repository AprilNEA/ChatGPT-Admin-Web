import { Redis } from "@upstash/redis";

const REDIS_URL = Bun.env.REDIS_URL!;
const REDIS_TOKEN = Bun.env.REDIS_TOKEN!;

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export default redis;
