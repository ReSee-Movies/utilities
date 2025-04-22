/**
 * Returns a randomized selection of records from `array`. The length of
 * the returned array will be either `targetCount` or the origin array's
 * length, whichever is smaller.
 */
export function getRandomEntries<T>(array: T[], targetCount = 1): T[] {
  const result = new Array(0) as T[];
  const taken = new Array(array.length) as number[];

  let length = array.length;
  let countdown = Math.min(array.length, targetCount);

  while (countdown--) {
    const randomIdx = Math.floor(Math.random() * length);

    result[countdown] = array[randomIdx in taken ? taken[randomIdx] : randomIdx];
    taken[randomIdx] = --length in taken ? taken[length] : length;
  }

  return result;
}
