import 'core-js/full/set/is-subset-of.js';

/**
 * Takes two argument, `self` and `other`, and returns a boolean indicating if all the
 * elements in `self` are also contained within `other`.
 *
 * If Set.isSubsetOf() is not supported then a polyfill will be used.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf
 */
export function isSubsetOf<T>(self: Set<T>, other: ReadonlySetLike<T>): boolean {
  return self.isSubsetOf(other);
}
