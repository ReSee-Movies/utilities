import 'core-js/full/set/is-disjoint-from.js';

/**
 * Takes two argument, `self` and `other`, and returns a boolean indicating if `self`
 * has no elements in common with `other`.
 *
 * If Set.isDisjointFrom() is not supported then a polyfill will be used.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom
 */
export function isDisjointFrom<T>(self: Set<T>, other: ReadonlySetLike<T>): boolean {
  return self.isDisjointFrom(other);
}
