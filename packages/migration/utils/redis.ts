import redis from "../instances/redis.ts";

export async function forBatchKeysWithPrefix(
  prefix: string,
  onBatch: (batch: string[], cancel: () => void) => void | Promise<void>,
) {
  let cursor = 0;

  do {
    const [newCursor, batch] = await redis.scan(cursor, {
      count: 1000,
      match: prefix + "*",
    });
    cursor = newCursor;

    await onBatch(batch, () => cursor = 0);
  } while (cursor !== 0);
}
