/**
 * Converts an integer expressing minutes of timezone offset into the
 * string form _"+/-mm:ss"_.
 */
export function toStringTimezoneOffset(minutes: number) {
  const min = Math.floor(minutes / 60);
  const sec = Math.floor(minutes % 60);

  const symbol = min < 0 ? '-' : '+';
  const strMin = `${ min < 10 ? '0' : '' }${ Math.abs(min) }`;
  const strSec = `${ sec < 10 ? '0' : '' }${ Math.abs(sec) }`;

  return `${ symbol }${ strMin }:${ strSec }`;
}
