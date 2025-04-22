/**
 * The type of Iterables that this collection module can work with.
 */
export type Operand<T> = Set<T> | Map<T, unknown> | T[];

/**
 * Ensure a SetLike instance from a variety of sources.
 */
export function toSet<T>(value: Operand<T>): Set<T> {
  if (value instanceof Map) {
    return new Set(value.keys());
  }
  else if (Array.isArray(value)) {
    return new Set(value);
  }

  return value;
}
