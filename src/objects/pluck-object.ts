import { isObjectLike, type MaybeObjectLike, type KeyOf, type NotNullish } from './is-object-like.js';


/**
 * Given and object `T`, returns a new object containing only the properties
 * from `T` that are enumerated in array `K`.
 */
export function pluckObject<
  T extends MaybeObjectLike,
  K extends KeyOf<T>,
>(
  value : T,
  keys  : K[],
): Pick<NotNullish<T>, K> {
  const targetObj = (isObjectLike(value) ? value : {}) as NotNullish<T>;

  return keys.reduce((acc, cur) => {
    acc[cur] = targetObj[cur];
    return acc;
  }, {} as Pick<NotNullish<T>, K>);
}
