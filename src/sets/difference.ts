import 'core-js/full/set/difference.js';

/**
 * Takes two argument, `self` and `other`, and returns a new object of the same type
 * as `self` which contains the elements that are in `self` but not in `other`.
 *
 * If Set.difference() is not supported then a polyfill will be used.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference
 */
export function difference<T>(self: Set<T>, other: ReadonlySetLike<T>): Set<T> {
  return self.difference(other);
}
