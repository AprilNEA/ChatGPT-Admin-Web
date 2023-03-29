/**
 * User utility functions.
 */
import {redis} from "@/lib/redis/instance";
import {UserRef} from "@/lib/redis/user-ref";
import type {Cookie} from "@/lib/redis/typing";

/**
 * Create a new UserRef instance for the given email.
 * @param email - The user's email.
 * @returns A UserRef instance.
 */
export function getWithEmail(email: string): UserRef {
  return new UserRef(email);
}


/**
 * List all registered user emails.
 * @returns An array of user emails.
 */
async function listEmails(): Promise<string[]> {
  const keys = await redis.keys("user:*");
  return keys.map((key) => key.split(":")[1]);
}


/**
 * Validate a cookie.
 */
export async function validateCookie(email: string, key: string): Promise<boolean> {
  const cookie_exist: Cookie | null = await redis.get(`cookies:${email.trim()}:${key.trim()}`);
  if (!cookie_exist) {
    return false;
  }
  return cookie_exist.exp > Date.now();
}

export async function rateLimit(email: string): Promise<boolean> {
  // 首先移除所有过期的时间戳
  await redis.zremrangebyscore(`limit:${email}`, 0, Date.now() - 3 * 60 * 60 * 1000);

  const requests_number = await redis.zcard(`limit:${email}`) ?? 0;
  if (requests_number >= 25) {
    return false;
  } else {
    const timestamp = Date.now();
    const limit = await redis.zadd(`limit:${email}`, {score: timestamp, member: timestamp});
    return true;
  }
}

/**
 *
 */
export async function registerUser(email: string, password: string): Promise<Cookie | null> {
  const userRef = new UserRef(email);
  if (await userRef.exists()) {
    return null;
  }
  await userRef.register(email, password);
  const cookieKey = await userRef.newCookie();
  if (cookieKey) {
    return cookieKey;
  }
  return null;
}
