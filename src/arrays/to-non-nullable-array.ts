/**
 * Given value T, returns an array in which null and undefined values have been removed.
 * If T is a non-nullable value that is not already an array, then T will be placed into
 * a new array at index 0.
 */
export function toNonNullableArray<T>(value: T | T[]): NonNullable<T>[] {
  return (Array.isArray(value) ? value : [value]).filter((item) => !(item === null || item === undefined));
}
