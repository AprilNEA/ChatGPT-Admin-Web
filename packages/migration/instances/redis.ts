import { connect } from "https://deno.land/x/redis@v0.30.0/mod.ts";

const REDIS_URL = Deno.env.get("REDIS_URL")!;
const { hostname, port, username, password } = new URL(REDIS_URL);

const redis = await connect({
  hostname,
  port,
  username,
  password,
});

export default redis;
