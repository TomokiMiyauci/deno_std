// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.

/**
 * Applies the given selector to all elements of the given collection and
 * returns the max value of all elements. If an empty array is provided the
 * function will return undefined
 *
 * Example:
 *
 * ```ts
 * import { maxOf } from "https://deno.land/std@$STD_VERSION/collections/max_of.ts"
 * import { assertEquals } from "https://deno.land/std@$STD_VERSION/testing/asserts.ts"
 *
 * const inventory = [
 *      { name: "mustard", count: 2 },
 *      { name: "soy", count: 4 },
 *      { name: "tomato", count: 32 },
 * ];
 * const maxCount = maxOf(inventory, (i) => i.count);
 *
 * assertEquals(maxCount, 32);
 * ```
 */
export function maxOf<T>(
  array: readonly T[],
  selector: (el: T) => number,
): number | undefined;

export function maxOf<T>(
  array: readonly T[],
  selector: (el: T) => bigint,
): bigint | undefined;

export function maxOf<T, S extends ((el: T) => number) | ((el: T) => bigint)>(
  array: readonly T[],
  selector: S,
): ReturnType<S> | undefined {
  let maximumValue: ReturnType<S> | undefined = undefined;

  for (const i of array) {
    const currentValue = selector(i) as ReturnType<S>;

    if (maximumValue === undefined || currentValue > maximumValue) {
      maximumValue = currentValue;
      continue;
    }

    if (Number.isNaN(currentValue)) {
      return currentValue;
    }
  }

  return maximumValue;
}
