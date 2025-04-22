/**
 * Returns a random integer value between the `min` (inclusive) and
 * `max` (exclusive) arguments. Only positive numbers are supported.
 */
export function getRandomInteger(min: number, max: number) {
  if (min < 0 || max < 0) {
    throw new Error('Only positive numbers are supported.');
  }

  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);


  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}
