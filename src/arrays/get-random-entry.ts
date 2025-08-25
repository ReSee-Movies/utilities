import { getRandomInteger } from '../numbers/get-random-integer';

/**
 * Returns a single random entry from the provided array.
 */
export function getRandomEntry<T>(array: T[]): T {
  return array[getRandomInteger(0, array.length)];
}
