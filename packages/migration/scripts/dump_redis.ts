import { collectJsonEntriesWithKeyPrefix } from "../utils/redis";
import { saveJson } from "../utils/json";

// dump users
await (async () => {
  const prefix = "user:";
  const entries = await collectJsonEntriesWithKeyPrefix(prefix);
  await saveJson("users", entries);
})();

// dump plans
await (async () => {
  const prefix = "plan:";
  const entries = await collectJsonEntriesWithKeyPrefix(prefix);
  await saveJson("plans", entries);
})();

// dump orders
await (async () => {
  const prefix = "order:";
  const entries = await collectJsonEntriesWithKeyPrefix(prefix);
  await saveJson("orders", entries);
})();

// dump invitationCodes
await (async () => {
  const prefix = "invitationCode:";
  const entries = await collectJsonEntriesWithKeyPrefix(prefix);
  await saveJson("invitationCodes", entries);
})();
