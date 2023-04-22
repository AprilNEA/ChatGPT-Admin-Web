import { ZodSchema } from "zod";

export interface DataEntry<T> {
  readonly schema: ZodSchema<T>;

  readonly key: string;
  getValue(): Promise<T | null>;
  setValue(value: T): Promise<void>;
}

export interface DataAccessLayer<
  M extends DataEntry<T>,
  T = M extends DataEntry<infer U> ? U : never,
> {
  readonly namespace: `${string}:`;

  create(id: string, data: T): Promise<DataEntry<T>>;
  update(
    id: string,
    data: Partial<DataEntry<T>>,
  ): Promise<DataEntry<T> | null>;
  getById(id: string): Promise<DataEntry<T> | null>;
  delete(id: string): Promise<boolean>;

  exists(id: string): Promise<boolean>;
  listKeys(cursor?: number): Promise<[number, string[]]>;
  listValues(cursor?: number): Promise<[number, T[]]>;
}
