import { ZodSchema } from "zod";
import { DataAccessLayer } from "./interfaces";
import { defaultRedis } from "../redis";
import { Redis } from "@upstash/redis";

/**
 * Abstract class for data access layer
 *
 * This class provides the following:
 * 1. simplify the creation logic by ensuring existence and validation
 * 2. simplify the update logic by ensuring existence
 * 3. provide a default implementation for listKeys
 * 4. provide a helper fn for getKey
 */
export abstract class AbstractDataAccessLayer<T> implements DataAccessLayer<T> {
  protected readonly redis: Redis;
  constructor(
    redis: Redis | AbstractDataAccessLayer<unknown> = defaultRedis,
  ) {
    if (redis instanceof AbstractDataAccessLayer) {
      this.redis = redis.redis;
    } else {
      this.redis = redis;
    }
  }

  abstract readonly schema: ZodSchema<T>;
  abstract readonly namespace: `${string}:`;

  protected abstract doCreate(id: string, data: T): Promise<void>;

  async create(id: string, data: T): Promise<boolean> {
    if (await this.exists(id)) return false;
    await this.doCreate(id, await this.schema.parseAsync(data));
    return true;
  }

  abstract read(id: string): Promise<T | null>;

  protected abstract doUpdate(id: string, data: Partial<T>): Promise<void>;

  async update(id: string, data: Partial<T>): Promise<boolean> {
    if (!await this.exists(id)) return false;
    await this.doUpdate(id, data);
    return true;
  }

  abstract delete(id: string): Promise<boolean>;

  abstract exists(id: string): Promise<boolean>;

  async listKeys(cursor = 0, count = 500): Promise<[number, string[]]> {
    const [newCursor, keys] = await this.redis.scan(cursor, {
      match: `${this.namespace}*`,
      count,
    });

    return [Number(newCursor), keys];
  }

  protected getKey(id: string): string {
    return `${this.namespace}${id}`;
  }
}
