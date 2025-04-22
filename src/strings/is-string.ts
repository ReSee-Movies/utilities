/**
 * A simple type guard for checking whether a value is a string.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
