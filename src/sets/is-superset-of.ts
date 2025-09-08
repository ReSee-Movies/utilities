import 'core-js/full/set/is-superset-of.js';

/**
 * Takes two argument, `self` and `other`, and returns a boolean indicating if all the
 * elements in `other` are also contained within `self`.
 *
 * If Set.isSupersetOf() is not supported then a polyfill will be used.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf
 */
export function isSupersetOf<T>(self: Set<T>, other: ReadonlySetLike<T>): boolean {
  return self.isSubsetOf(other);
}
