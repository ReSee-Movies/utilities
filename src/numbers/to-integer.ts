/**
 * Always returns an integer value, or NaN. If `value` is a number then it will
 * be rounded down to the nearest whole number. If `value` is a string it will be
 * parsed as an integer. All other arguments will result in NaN.
 */
export function toInteger(value: unknown) {
  if (typeof value === 'number') {
    return Math.floor(value);
  }

  return typeof value === 'string' ? parseInt(value) : NaN;
}
