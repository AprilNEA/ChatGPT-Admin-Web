import { ZodSchema, ZodTypeDef } from "zod";
import { DataAccessLayer } from "./interfaces";
import { defaultRedis } from "../redis";

export abstract class AbstractDataAccessLayer<T> implements DataAccessLayer<T> {
  constructor(protected readonly redis = defaultRedis) {}

  abstract readonly schema: ZodSchema<T, ZodTypeDef, T>;
  abstract readonly namespace: `${string}:`;

  abstract doCreate(id: string, data: T): Promise<void>;

  async create(id: string, data: T): Promise<boolean> {
    if (await this.exists(id)) return false;
    await this.doCreate(id, data);
    return true;
  }

  abstract doRead(id: string): Promise<T>;

  async read(id: string): Promise<T | null> {
    if (!await this.exists(id)) return null;
    return this.schema.parse(await this.doRead(id));
  }

  abstract doUpdate(id: string, data: Partial<T>): Promise<void>;

  async update(id: string, data: Partial<T>): Promise<boolean> {
    if (!await this.exists(id)) return false;
    await this.doUpdate(id, data);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    return await this.redis.del(`${this.namespace}${id}`) > 0;
  }

  abstract exists(id: string): Promise<boolean>;

  protected async existsByKey(id: string): Promise<boolean> {
    return await this.redis.exists(`${this.namespace}${id}`) > 0;
  }

  async listKeys(cursor = 0): Promise<[number, string[]]> {
    const [newCursor, keys] = await this.redis.scan(cursor, {
      match: `${this.namespace}*`,
    });

    return [Number(newCursor), keys];
  }

  abstract listValues(cursor?: number): Promise<[number, T[]]>;
}
