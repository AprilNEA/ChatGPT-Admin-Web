import type { MaybePromise } from '@libs/key-pool/utils';

export type KeyPoolSelector = (
  keys: string[],
) => MaybePromise<string | null | undefined>;

export type KeyPoolSelectorSync = (keys: string[]) => string | null | undefined;

export type KeyPoolKeys = () => MaybePromise<string[]>;

export type KeyPoolKeysSync = () => string[];

export function makeKeyGetter(keys: KeyPoolKeys, selector: KeyPoolSelector) {
  return async () => (await selector(await keys())) ?? null;
}

export function makeSyncKeyGetter(
  keys: KeyPoolKeysSync,
  selector: KeyPoolSelectorSync,
) {
  return () => selector(keys()) ?? null;
}
