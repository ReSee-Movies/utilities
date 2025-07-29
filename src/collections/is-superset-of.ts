import { type Operand, toSet } from './to-set';
import 'core-js/full/set/is-superset-of.js';

/**
 * Takes two argument, `self` and `other`, and returns a boolean indicating if all the
 * elements in `other` are also contained within `self`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf
 */
export function isSupersetOf<T>(self: Operand<T>, other: Operand<T>) {
  return toSet(self).isSubsetOf(toSet(other));
}
