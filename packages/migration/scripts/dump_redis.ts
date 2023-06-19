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
    .filter(({ key, value }, i) => {
      if (key.length <= prefix.length) {
        console.warn(
          `dump: invalid ${name} entry: ${JSON.stringify(entries[i])}`,
        );
        return false;
      }

      const parseResult = schema.safeParse(value);
      const isKept = parseResult.success;
      if (!isKept) {
        console.warn(
          `dump: invalid ${name} entry: ${
            JSON.stringify(entries[i])
          } due to ${parseResult.error}`,
        );
      }
      return isKept;
    });
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
