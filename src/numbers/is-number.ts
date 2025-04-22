/**
 * Type-check that the provided value is a number.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
