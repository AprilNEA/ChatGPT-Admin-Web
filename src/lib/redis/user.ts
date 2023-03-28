import {Redis} from "@upstash/redis";
import md5 from "spark-md5";

const redis = new Redis({
  url: "https://above-camel-33559.upstash.io",
  token:
    "AYMXACQgNGI5NzdlNTUtYjVlMy00ZGJlLTk1NGUtOTQ4YzYzZWZmZTQwMjlmMDEzYzUxODM1NGVhNTljNzg5ZmFlOWZjYzlhZTU=",
});

export interface User {
  password: string;
  created_at: number;
  last_login: number;
  activated: boolean;
  blocked: boolean;
}

/**
 * Get user by email
 * @param email
 */
const getUserByEmail = async (email: string) => {
  const user = await redis.hgetall(`user:${email}`);
  return Object.keys(user ?? {}).length > 0 ? user : null;
};

/**
 * 登录
 * @param email
 * @param password
 * @return 返回 hash_password 后的密码
 */
export const loginUserWithEmail = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (user === null) {
    return false;
  }

  const success = password == user.password;

  if (success) {
    await redis.hset(`user:${email}`, {last_login: Date.now()});
  }

  return success;
};

/**
 * 新建用户
 * @param email
 * @param password
 * @return 返回 md5 hash 后的密码
 */
export const newUser = async (
  email: string,
  password: string
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser !== null) {
    throw new Error("user already exists");
  }
  await redis.hset(`user:${email}`, {
    password,
    created_at: Date.now(),
    last_login: 0,
    activated: false,
    blocked: false,
  });

  return md5.hash(password.trim());
};

/**
 *
 */
export const listUserEmails = async () => {
  const keys = await redis.keys("user:*");
  return keys.map((key) => key.split(":")[1]);
};


export const updateUserWithEmail = async (
  email: string,
  updatedData: Partial<User>,
) => {
  await redis.hset(`user:${email}`, updatedData);
};
/**
 * Never Delete, only block
 * @param email
 */
export const deleteUserWithEmail = async (email: string) => {
  await redis.del(`user:${email}`);
};
