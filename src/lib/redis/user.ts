import {Redis} from "@upstash/redis";

const redis = new Redis({
  url: "https://above-camel-33559.upstash.io",
  token:
    "AYMXACQgNGI5NzdlNTUtYjVlMy00ZGJlLTk1NGUtOTQ4YzYzZWZmZTQwMjlmMDEzYzUxODM1NGVhNTljNzg5ZmFlOWZjYzlhZTU=",
});

export interface User {
  username: string;
  password: string;
  created_at: number;
  last_login: number;
  is_active: boolean;
  is_blocked: boolean;
}

const getUserByEmail = async (email: string) => {
  const user = await redis.hgetall(`user:${email}`);
  return Object.keys(user ?? {}).length > 0 ? user : null;
};

export const newUser = async (
  username: string,
  password: string,
  email: string,
) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser !== null) {
    throw new Error("user already exists");
  }

  await redis.hset(`user:${email}`, {
    username,
    password,
    created_at: Date.now(),
    last_login: 0,
    is_active: false,
    is_blocked: false,
  });

  return email;
};

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

export const listUserEmails = async () => {
  const keys = await redis.keys("user:*");
  return keys.map((key) => key.split(":")[1]);
};

export const getUserWithEmail = async (email: string) => {
  return await getUserByEmail(email);
};

export const updateUserWithEmail = async (
  email: string,
  updatedData: Partial<User>,
) => {
  await redis.hset(`user:${email}`, updatedData);
};

export const deleteUserWithEmail = async (email: string) => {
  await redis.del(`user:${email}`);
};
