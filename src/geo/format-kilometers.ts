/**
 * Given a numerical value of kilometers, this method creates a formatted string
 * by rounding the value to the nearest 1/10, and appending "km". For a value of
 * `-1 < value < 1` the result is formatted in meters.
 */
export function formatKilometers(value: unknown) {
  if (typeof value !== 'number') {
    return 'N/A';
  }

  if (value < 1 && value > -1) {
    return `${ Math.round(value * 1000) } m`;
  }

  return `${ Math.round(value * 10) / 10 } km`;
}
