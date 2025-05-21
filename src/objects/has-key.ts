/**
 * Type guard that `value` could be used to index an object.
 */
function couldBeObjectKey(value: unknown): value is string | number | symbol {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol';
}

/**
 * Checks that the provided `target` object has key `value`.
 */
export function hasKey<T extends object>(target: T, value: unknown): value is keyof T {
  return couldBeObjectKey(value) && value in target;
}
