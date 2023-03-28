import { redis } from "./instance";
import { User } from "./typing";
import md5 from "spark-md5";

/**
 * User utility functions.
 */
export const user = {
  /**
   * Create a new UserRef instance for the given email.
   * @param email - The user's email.
   * @returns A UserRef instance.
   */
  withEmail(email: string): UserRef {
    return new UserRef(email);
  },

  /**
   * List all registered user emails.
   * @returns An array of user emails.
   */
  async listEmails(): Promise<string[]> {
    const keys = await redis.keys("user:*");
    return keys.map((key) => key.split(":")[1]);
  },
};

class UserRef {
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
    if (success && this.cache) this.cache = { ...this.cache, ...user };
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
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns True if successful, false otherwise.
   */
  async register(username: string, password: string): Promise<boolean> {
    const user = await this.get();
    if (user !== null) {
      return false;
    }

    return this.set({
      username,
      password_hash: md5.hash(password.trim()),
      last_login: Date.now(),
      created_at: Date.now(),
      subscription_level: 0,
      is_active_until: Date.now(),
      is_blocked: false,
    });
  }

  /**
   * Attempt to log in a user.
   * @param password - The user's password.
   * @returns True if successful, false otherwise.
   */
  async login(password: string): Promise<boolean> {
    const user = await this.get();
    if (user === null) {
      return false;
    }

    const success = md5.hash(password.trim()) === user.password_hash;
    if (success) {
      await this.set({ last_login: Date.now() });
    }
    return success;
  }
}

