/**
 * User utility functions.
 */
import {redis} from "@/lib/redis/instance";
import {UserRef} from "@/lib/redis/user-ref";
import type {Cookie} from "@/lib/redis/typing";

type LimitReason = 'OK' | 'tooFast' | 'tooMuch'

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
  // 如果存在说明未激活, 不存在的话肯定是激活的(由[Login/Register]=>newCookie()保证), 存在且为True则为当次激活
  if (cookie_exist.activated !== undefined && !cookie_exist.activated) {
    return false;
  }

  return cookie_exist.exp > Date.now();
}

export async function rateLimit(email: string): Promise<LimitReason> {
  const last_request = Number(await redis.get(`limit:rate:${email}`)) ?? 0 as number;

  // 请求速率
  if (last_request + 5000 > Date.now()) return 'tooFast';

  // 首先移除所有过期的时间戳
  await redis.zremrangebyscore(`limit:${email}`, 0, Date.now() - 3 * 60 * 60 * 1000);

  const requests_number = await redis.zcard(`limit:${email}`) ?? 0;
  if (requests_number >= 25) {
    return 'tooMuch';
  } else {
    const timestamp = Date.now();
    await redis.set(`limit:rate:${email}`, timestamp);
    const limit = await redis.zadd(`limit:${email}`, {score: timestamp, member: timestamp});
    return 'OK';
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

function generateRandomSixDigitNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export async function newRegisterCode(email: string): Promise<number> {
  const key = `register:code:${email.trim()}`
  const code = await redis.get(key)

  // 如果存在 Code 那么直接返回存在的 Code
  if (code) {
    return Number(code);
  }
  // TODO 这里需要设置过期时间
  const randomNumber = generateRandomSixDigitNumber();
  if (await redis.set(key, randomNumber) == "OK")
    return randomNumber;

  return -1;
}

export async function activateRegisterCode(email: string, code: string): Promise<boolean> {
  const key = `register:code:${email.trim()}`
  const randomNumber = await redis.get(key);
  if (randomNumber == code) {
    await redis.del(key);
    // await this.set({is_activated: true});
    return true;
  }
  return false;
}
