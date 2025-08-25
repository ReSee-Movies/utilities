/**
 * Config options for the {@link areArraysEqual} method.
 */
export type AreArraysEqualOptions = {
  /**
   * Lighten the testing requirements to ignore ordering - the values in `arrayA`
   * must appear in `arrayB`, but not at the same index.
   *
   * Note that this does not count/compare the number of times that a given value
   * is present in both arrays, only that the value is present. This means, for
   * example, that comparing `['A', 'B', 'B']` and `['A', 'A', 'B']` will return
   * `true` when using this option.
   */
  ignoreOrder?: boolean;
}

/**
 * Basic equality-checking for two arrays, which each entry of `arrayA` with
 * those of `arrayB` at the same index.
 */
export function areArraysEqual<T>(
  arrayA   : T[],
  arrayB   : T[],
  options? : AreArraysEqualOptions,
): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i += 1) {
    if (options?.ignoreOrder ? !arrayB.includes(arrayA[i]) : arrayA[i] !== arrayB[i]) {
      return false;
    }
  }

  return true;
}
