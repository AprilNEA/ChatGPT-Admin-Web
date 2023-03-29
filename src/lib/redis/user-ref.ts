import {redis} from "./instance";
import {Cookie, User} from "./typing";
import md5 from "spark-md5";

export class UserRef {
  readonly key: string;

  /**
   * Constructs a UserRef instance.
   * @param email - The user's email.
   */
  constructor(email: string) {
    this.key = `user:${email}`;
  }

  private cache: User | null = null;

  /**
   * Get the user data from cache or Redis.
   * @returns The user data or null if not found.
   */
  async get(): Promise<User | null> {
    if (!this.cache) this.cache = await redis.hgetall(this.key) as User | null;
    return this.cache;
  }

  /**
   * Set/update the user data in Redis.
   * @param user - The user data to set/update.
   * @returns True if successful, false otherwise.
   */
  async set(user: Partial<User>): Promise<boolean> {
    const success = await redis.hmset(this.key, user) === "OK";
    if (success && this.cache) this.cache = {...this.cache, ...user};
    return success;
  }

  /**
   * Check if the user exists in Redis.
   * @returns True if the user exists, false otherwise.
   */
  async exists(): Promise<boolean> {
    return !!(await redis.exists(this.key));
  }

  /**
   * Clear the user data from Redis.
   * @returns True if successful, false otherwise.
   */
  async clear(): Promise<boolean> {
    const success = await redis.del(this.key) === 1;
    if (success) this.cache = null;
    return success;
  }

  /**
   * Register a new user.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns True if successful, false if failed or user already exists.
   */
  async register(email: string, password: string): Promise<boolean> {
    const user = await this.get();
    if (user !== null) {
      return false;
    }

    return this.set({
      email,
      password_hash: md5.hash(password.trim()),
      last_login: Date.now(),
      created_at: Date.now(),
      subscription_level: 0,
      subscription_until: Date.now(),
      is_activated: true,
      is_blocked: false,
    });
  }

  /**
   * Attempt to log in a user.
   * @param password - The user's password.
   * @returns True if successful, false otherwise.
   */
  async login(password: string): Promise<Cookie | null> {
    const user = await this.get();
    if (user === null) {
      return null;
    }

    if (md5.hash(password.trim()) === user.password_hash) {
      await this.set({last_login: Date.now()});
      return await this.newCookie();
    }
    return null;
  }

  /**
   * Create a new cookie for the user.
   * @returns The cookie key or null if failed.
   */
  async newCookie(): Promise<Cookie | null> {
    const user = await this.get();
    if (user === null) {
      return null;
    }
    const key = md5.hash(`${user.email}:${Date.now()}`);

    const cookie: Cookie = {
      key,
      email: user.email,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 设置过期时间为一天
    };

    const success = await redis.set(`cookies:${user.email}:${key}`, cookie) === "OK"
    if (success) {
      return cookie;
    }
    return null;
  }

  // async get_cookies(): Promise<Cookie[] | null> {
  //   const user = await this.get();
  //   if (user === null) {
  //     return null;
  //   }
  //
  //   const cookies = await redis.keys(`cookies:${user.email}:*`);
  //   return cookies;
  // }
}

