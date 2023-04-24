import { Redis } from "@upstash/redis";
import { UserDAL } from "../src";

export const testRedis = new Redis(
  {
    url: "http://124.223.23.163:10086",
    token: "lmobest_test",
  },
);

export const testUserDAL = new UserDAL(testRedis);
