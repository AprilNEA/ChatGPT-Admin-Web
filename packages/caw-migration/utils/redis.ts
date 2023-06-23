import redis from "../instances/redis.ts";
import { KvEntry } from "../types/common.ts";

export async function forBatchKeysWithPrefix(
  prefix: string,
  onBatch: (batch: string[], cancel: () => void) => void | Promise<void>,
) {
  let cursor = 0;
  const resetCursor = () => cursor = 0;

  do {
    const [newCursor, batch] = await redis.scan(cursor, {
      count: 1000,
      match: prefix + "*",
    });
    console.debug(`scan: ${cursor} -> ${newCursor} (${batch.length})`);
    cursor = newCursor;

    await onBatch(batch, resetCursor);
  } while (cursor !== 0);
}

export async function collectJsonEntriesWithKeyPrefix<V = unknown>(
  prefix: string,
): Promise<KvEntry<V>[]> {
  const entries: KvEntry<V>[] = [];

  await forBatchKeysWithPrefix(prefix, async (batch) => {
    const batchValues: [V][] = await redis.json.mget(batch, "$");
    const batchEntries: KvEntry<V>[] = batch.map((key, index) => ({
      key,
      value: batchValues[index][0],
    }));
    entries.push(...batchEntries);
  });

  return entries;
}
