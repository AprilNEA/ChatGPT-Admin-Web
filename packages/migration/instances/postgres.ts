import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const POSTGRES_URL = Deno.env.get("POSTGRES_URL")!;

const postgres = new Client(POSTGRES_URL);
await postgres.connect();

export default postgres;
