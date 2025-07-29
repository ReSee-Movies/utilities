import { toSet, type Operand } from './to-set';
import 'core-js/full/set/is-disjoint-from.js';

/**
 * Takes two argument, `self` and `other`, and returns a boolean indicating if `self`
 * has no elements in common with `other`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom
 */
export function isDisjointFrom<T>(self: Operand<T>, other: Operand<T>) {
  return toSet(self).isDisjointFrom(toSet(other));
}
