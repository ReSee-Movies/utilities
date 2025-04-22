export type NotNullish<T> = Exclude<T, null | undefined>;

export type ObjectLike = Record<string | number | symbol, unknown>;

export type MaybeObjectLike = ObjectLike | null | undefined;

export type KeyOf<T extends MaybeObjectLike> = keyof NotNullish<T>;


/**
 * Type guard that checks for `value` being some kind of object.
 */
export function isObjectLike(value: unknown): value is ObjectLike {
  return !!value && typeof value === 'object' && value.toString() === '[object Object]';
}
