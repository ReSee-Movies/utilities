import { toValue, type MaybeRefOrGetter } from 'vue';
import { isObjectLike, type MaybeObjectLike, type KeyOf, type NotNullish } from './is-object-like';


/**
 * Given and object `T`, returns a new object containing only the properties from `T` that are
 * enumerated in array `K`.
 */
export function pluckObject<
  T extends MaybeObjectLike,
  K extends KeyOf<T>,
>(
  value: MaybeRefOrGetter<T>,
  keys: K[],
) {
  const unwrapped = toValue(value);
  const targetObj = (isObjectLike(unwrapped) ? unwrapped : {}) as NotNullish<T>;

  return keys.reduce((acc, cur) => {
    acc[cur] = targetObj[cur];
    return acc;
  }, {} as Pick<NotNullish<T>, K>);
}
