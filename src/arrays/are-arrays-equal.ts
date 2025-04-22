/**
 * A very basic array comparison utility. Items in the array are checked via
 * simple strict equality. Optionally, the exact ordering of the arrays can
 * be ignored.
 */
export function areArraysEqual<T>(arrayA: T[], arrayB: T[], options?: { ignoreOrder?: boolean }) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i += 1) {
    if (options?.ignoreOrder ? !arrayB.includes(arrayA[i]) : arrayA[i] !== arrayB[i]) {
      return false;
    }
  }

  return true;
}
