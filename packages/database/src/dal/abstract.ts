import { ZodSchema, ZodTypeDef } from "zod";
import { DataAccessLayer } from "./interfaces";
import { defaultRedis } from "../redis";

export abstract class AbstractDataAccessLayer<T> implements DataAccessLayer<T> {
  constructor(protected readonly redis = defaultRedis) {}

  abstract readonly schema: ZodSchema<T, ZodTypeDef, T>;
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

  async listKeys(cursor = 0): Promise<[number, string[]]> {
    const [newCursor, keys] = await this.redis.scan(cursor, {
      match: `${this.namespace}*`,
    });

    return [Number(newCursor), keys];
  }

  abstract listValues(cursor?: number): Promise<[number, T[]]>;

  protected getKey(id: string): string {
    return `${this.namespace}${id}`;
  }
}
