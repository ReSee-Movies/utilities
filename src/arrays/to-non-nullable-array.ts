import { toArray } from './to-array.js';

/**
 * Given value T, returns an array in which null and undefined values have been removed.
 * If T is a non-nullable value that is not already an array, then T will be placed into
 * a new array at index 0.
 */
export function toNonNullableArray<T>(value: T | T[]): NonNullable<T>[] {
  return toArray(value).filter((item) => !(item === null || item === undefined));
}
