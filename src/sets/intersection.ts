import 'core-js/full/set/intersection.js';


/**
 * Takes two argument, `self` and `other`, and returns a new object of the same type
 * as `self` which contains the elements that are in both `self` and `other`.
 *
 * If Set.intersection() is not supported then a polyfill will be used.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection
 */
export function intersection<T>(self: Set<T>, other: ReadonlySetLike<T>): Set<T> {
  return self.intersection(other);
}
