import { isObjectLike, type MaybeObjectLike, type KeyOf, type NotNullish, type ObjectLike } from './is-object-like';


/**
 * Given an object `T`, returns a new object containing only the properties from `T` that were
 * not enumerated in array `K`.
 */
export function pruneObject<
  T extends MaybeObjectLike,
  K extends KeyOf<T>,
>(
  value : T,
  keys  : K[],
): Omit<NotNullish<T>, K> {
  const targetObj = (isObjectLike(value) ? value : {}) as NotNullish<T>;
  const resultObj = {} as ObjectLike;

  for (const key of Object.keys(targetObj)) {
    if (!keys.includes(key as K)) {
      resultObj[key] = targetObj[key];
    }
  }

  return resultObj as Omit<NotNullish<T>, K>;
}
