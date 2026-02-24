import { areArraysEqual } from '../arrays/are-arrays-equal.js';


/**
 * Strict equality comparison of two values, with the additional step
 * of deep comparing the contents of the two arguments when they are
 * arrays.
 *
 * Note that this does not perform deep comparison of objects.
 */
export function areEqual(a: unknown, b: unknown) {
  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return areArraysEqual(a, b);
  }

  return false;
}
