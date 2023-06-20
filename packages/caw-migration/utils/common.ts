import { resolve } from "node:path";

export function firstCharUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const dumpPath = resolve(
  Bun.fileURLToPath(new URL(import.meta.url)),
  "../../dumps",
);

export function deepDistinct<T>(array: T[]): T[] {
  return Array.from(new Set(array.map((e) => JSON.stringify(e))))
    .map((e) => JSON.parse(e));
}

// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.

/**
 * Returns all elements in the given array that produce a distinct value using
 * the given selector, preserving order by first occurrence.
 *
 * @example
 * ```ts
 * import { distinctBy } from "https://deno.land/std@$STD_VERSION/collections/distinct_by.ts";
 * import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts";
 *
 * const names = ["Anna", "Kim", "Arnold", "Kate"];
 * const exampleNamesByFirstLetter = distinctBy(names, (it) => it.charAt(0));
 *
 * assertEquals(exampleNamesByFirstLetter, ["Anna", "Kim"]);
 * ```
 */
export function distinctBy<T, D>(
  array: Iterable<T>,
  selector: (el: T) => D,
): T[] {
  const selectedValues = new Set<D>();
  const ret: T[] = [];

  for (const element of array) {
    const currentSelectedValue = selector(element);

    if (!selectedValues.has(currentSelectedValue)) {
      selectedValues.add(currentSelectedValue);
      ret.push(element);
    }
  }

  return ret;
}
