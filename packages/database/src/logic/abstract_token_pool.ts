import { defaultRedis } from "../redis/client";

// An abstract token pool using redis list
export abstract class AbstractTokenPool {
  protected abstract redisKey: string;
  protected abstract ttl: number;

  private autoReleaseMap = new Map<string, ReturnType<typeof setTimeout>>();

  // Acquire token method
  async acquire(): Promise<string | null> {
    const token = await defaultRedis.lpop<string>(this.redisKey);

    if (token) {
      // Set an auto-release mechanism for the token after ttl duration
      const releaseTokenTimeout = setTimeout(() => {
        this.release(token);
        this.autoReleaseMap.delete(token);
      }, this.ttl);

      // Store the auto-release timeout in the autoReleaseMap
      this.autoReleaseMap.set(token, releaseTokenTimeout);
    }

    return token;
  }

  // Release token method
  async release(token: string): Promise<boolean> {
    // Check if the token exists in the autoReleaseMap
    if (!this.autoReleaseMap.has(token)) {
      // The token has already been automatically released or was never acquired
      return false;
    }

    // Add the token back to the Redis list
    const released = !!(await defaultRedis.rpush(this.redisKey, token));

    if (released) {
      // Clear the auto-release timeout and remove the token from the autoReleaseMap
      const timeout = this.autoReleaseMap.get(token);
      if (timeout) {
        clearTimeout(timeout);
        this.autoReleaseMap.delete(token);
      }
    }

    return released;
  }
}
