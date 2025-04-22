import { toSet, type Operand } from './to-set';

/**
 * Takes two argument, `self` and `other`, and returns a boolean indicating if all the
 * elements in `self` are also contained within `other`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf
 */
export function isSubsetOf<T>(self: Operand<T>, other: Operand<T>) {
  return toSet(self).isSubsetOf(toSet(other));
}
