import type { MaybePromise } from './utils';

export type ValueStore<T> = {
  get(): MaybePromise<T>;
  set(value: T): MaybePromise<void>;
};

export interface ValueStoreSync<T> extends ValueStore<T> {
  get(): T;
  set(value: T): void;
}

export interface CachedValueStore<T> extends ValueStore<T> {
  expire(): void;
}

export type Callable<V> = V extends ValueStore<unknown> ? V & V['get'] : never;

export type MapFn<T, U> = (value: T) => U;

type MapFnPair<T, U> = {
  getMapFn: MapFn<T, U>;
  setMapFn: MapFn<U, T>;
};

export function store<T>(value: T): ValueStoreSync<T> {
  return {
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
    },
  };
}

export function cached<T>({ get, set }: ValueStore<T>): CachedValueStore<T> {
  let value: T | null = null;

  return {
    async get() {
      if (value === null) {
        value = await get();
      }

      return value;
    },

    async set(newValue) {
      if (value === newValue) return;

      await set(newValue);
      value = newValue;
    },

    expire() {
      value = null;
    },
  };
}

export function callable<V extends ValueStore<unknown>>(store: V): Callable<V> {
  return Object.assign(() => store.get(), store) as Callable<V>;
}

export function map<V extends ValueStore<T>, T, U>(
  store: V,
  {
    getMapFn = () => {
      throw new Error('getMapFn not provided. Cannot get value.');
    },
    setMapFn = () => {
      throw new Error('setMapFn not provided. Cannot set value.');
    },
  }: Partial<MapFnPair<T, U>> = {},
): ValueStore<U> & Omit<V, 'get' | 'set'> {
  return {
    ...store,
    async get(): Promise<U> {
      const storedValue = await store.get();
      return getMapFn(storedValue);
    },

    async set(value: U): Promise<void> {
      const mappedValue = setMapFn(value);
      await store.set(mappedValue);
    },
  };
}
