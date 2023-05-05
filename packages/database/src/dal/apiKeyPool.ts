import { defaultRedis } from "../redis";
import { Redis } from "@upstash/redis";

export class APIKeyPoolDAL<T extends Redis = Redis> {
  // data type: Map<Key, Credit>
  readonly key = "apikey:pool";

  constructor(private readonly redis: T = defaultRedis as T) {}

  /** Set API Keys, can be either creation or update */
  set(keyCreditRecord: Record<string, number>) {
    return this.redis.hset<number>(this.key, keyCreditRecord);
  }

  /** Read all API Keys, the result is a record whose key is API Key and value is credit */
  read() {
    return this.redis.hgetall<Record<string, number>>(this.key);
  }

  delete(key: string) {
    return this.redis.hdel(this.key, key);
  }
}
