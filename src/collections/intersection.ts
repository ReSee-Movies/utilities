import { type Operand, toSet } from './to-set';
import 'core-js/full/set/intersection.js';

/**
 * Takes two argument, `self` and `other`, and returns a new object of the same type
 * as `self` which contains the elements that are in both `self` and `other`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection
 */
export function intersection<T, S extends Operand<T>>(self: S, other: Operand<T>): S {
  const result = toSet(self).intersection(toSet(other));

  if (self instanceof Map) {
    return new Map(Array.from(result).map((key) => [key, self.get(key)])) as S;
  }
  else if (Array.isArray(self)) {
    return Array.from(result) as S;
  }

  return result as S;
}
