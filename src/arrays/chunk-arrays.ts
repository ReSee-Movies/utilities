/**
 * Slices an array into a set of smaller arrays no larger than `chunkSize`. The last
 * array in the list may be shorter than the others.
 */
export function chunkArray<T>(array: T[], chunkSize: number) {
  const result = [] as T[][];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
