/**
 * Converts a union of types into an intersection of those same types.
 *
 * ```
 * type Union = { size: string } | { color: string };
 * type Intersection = UnionToIntersection<Union>;
 * // => { size: string } & { color: string }
 * ```
 */
export type UnionToIntersection<T> =
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
