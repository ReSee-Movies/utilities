/**
 * Returns a randomized selection of records from `array`. The length of
 * the returned array will be either `targetCount` or the origin array's
 * length, whichever is smaller.
 */
export function getRandomEntries<T>(array: T[], targetCount = 1): T[] {
  const result: T[]     = new Array(0);
  const taken: number[] = new Array(array.length);

  let length    = array.length;
  let countdown = Math.min(array.length, targetCount);

  while (countdown--) {
    const randomIdx = Math.floor(Math.random() * length);

    result[countdown] = array[randomIdx in taken ? taken[randomIdx] : randomIdx];
    taken[randomIdx] = --length in taken ? taken[length] : length;
  }

  return result;
}
