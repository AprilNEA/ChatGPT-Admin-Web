import { Redis } from "@upstash/redis";
import { InvitationCodeDAL, UserDAL } from "../src";

export const testRedis = new Redis({
  url: "https://apn1-first-chimp-35184.upstash.io",
  token:
    "AYlwACQgMTMxZTBlYzEtNTdiMC00OTMzLTk0OWEtMzA3OTgyYTFhZTI2NzNhZDk2ZmNjODQxNGUwMWE0MTUxNjEyMmVlNGNiNmI=",
});

export const testUserDAL = new UserDAL(testRedis);
export const testInvitationCodeDAL = new InvitationCodeDAL(testRedis);
