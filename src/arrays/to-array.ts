/**
 * Returns value T if T is an array, otherwise, T is placed into a new
 * array at index 0.
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
