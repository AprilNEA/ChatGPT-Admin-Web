import { collectJsonEntriesWithKeyPrefix } from "../utils/redis";
import { invitationCode, order, plan, user } from "database-old";
import { saveJson } from "../utils/json";
import { ZodSchema } from "zod";

async function dump(name: string, schema: ZodSchema) {
  const prefix = name + ":";
  const names = name + "s";

  const entries = await collectJsonEntriesWithKeyPrefix(prefix);
  console.debug(`dump: collected ${entries.length} ${name} entries`);

  const validatedEntries = entries
    .filter(({ value }) => schema.safeParse(value).success);
  console.debug(`dump: validated ${validatedEntries.length} ${name} entries`);

  await saveJson(names, validatedEntries);
}

// dump users
await dump("user", user);

// dump plans
await dump("plan", plan);

// dump orders
await dump("order", order);

// dump invitationCodes
await dump("invitationCode", invitationCode);
