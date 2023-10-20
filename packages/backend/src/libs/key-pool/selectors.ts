import { KeyPoolSelector, KeyPoolSelectorSync } from './core';
import type { MaybePromise } from './utils';

export const randomSelector: KeyPoolSelectorSync = (keys) => {
  const index = Math.floor(Math.random() * keys.length);
  return keys.at(index);
};

export function makeLRUSelector(
  initialFrequencies?: Map<string, number>,
): KeyPoolSelectorSync {
  if (initialFrequencies) {
    if ([...initialFrequencies.values()].some((v) => v < 0)) {
      throw new Error('Initial frequencies cannot be negative');
    }
  }

  const frequencies = new Map(initialFrequencies);

  return (keys) => {
    let min = Infinity;
    let minKey: string | undefined;

    for (const key of keys) {
      const frequency = frequencies.get(key);

      if (frequency === undefined) {
        frequencies.set(key, 1);
        return key;
      }

      if (frequency < min) {
        min = frequency;
        minKey = key;
      }
    }

    if (minKey === undefined) return null;

    frequencies.set(minKey, min + 1);
    return minKey;
  };
}

export function makeWeightedSelector(
  weightsOf: (keys: string[]) => MaybePromise<number[]>,
): KeyPoolSelector {
  return async (keys) => {
    const weights = await weightsOf(keys);

    if (weights.length !== keys.length) {
      throw new Error('Weights and keys must be the same length');
    }

    let total = 0;
    for (const weight of weights) {
      if (weight < 0) throw new Error('Weights cannot be negative');
      total += weight;
    }

    if (total === 0) return null;

    let random = Math.random() * total;

    for (let i = 0; i < keys.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return keys[i];
      }
    }

    return null;
  };
}
