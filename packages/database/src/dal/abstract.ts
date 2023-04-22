import { ZodSchema } from "zod";
import { DataAccessLayer, DataEntry } from "./interfaces";
import { redis } from "../redis";

export abstract class AbstractDataEntry<T> implements DataEntry<T> {
  abstract readonly schema: ZodSchema<T>;

  constructor(public readonly key: string) {}

  protected abstract doGetValue(): Promise<T | null>;
  protected abstract doSetValue(value: T): Promise<void>;

  async getValue(): Promise<T | null> {
    const value = await this.doGetValue();
    if (value === null) return null;
    return this.schema.parse(value);
  }

  async setValue(value: T): Promise<void> {
    await this.doSetValue(this.schema.parse(value));
  }
}

export abstract class AbstractDataAccessLayer<
  M extends DataEntry<T>,
  T = M extends DataEntry<infer U> ? U : never,
> implements DataAccessLayer<M, T> {
  abstract readonly namespace: `${string}:`;

  abstract create(id: string, data: T): Promise<DataEntry<T>>;
  abstract update(
    id: string,
    data: Partial<DataEntry<T>>,
  ): Promise<DataEntry<T> | null>;
  abstract getById(id: string): Promise<DataEntry<T> | null>;
  abstract delete(id: string): Promise<boolean>;

  async exists(id: string): Promise<boolean> {
    return Boolean(await redis.exists(`${this.namespace}${id}`));
  }

  async listKeys(cursor = 0): Promise<[number, string[]]> {
    const [newCursor, keys] = await redis.scan(cursor, {
      match: `${this.namespace}*`,
    });

    return [Number(newCursor), keys];
  }

  abstract listValues(cursor?: number): Promise<[number, T[]]>;
}
