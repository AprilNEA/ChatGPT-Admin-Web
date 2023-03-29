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
async function validateCookie(email: string, cookieKey: string): Promise<boolean> {
  const cookie: Cookie | null = await redis.get(`cookies:${email}:${cookieKey}`);
  if (!cookie) {
    return false;
  }
  return cookie.exp > Date.now();
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
