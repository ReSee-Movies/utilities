/**
 * Given a timezone name, return its offset, in minutes, from UTC.
 */
export function getTimezoneOffset(timeZone = 'UTC', date = new Date()) {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const tzDate  = new Date(date.toLocaleString('en-US', { timeZone }));

  return (tzDate.getTime() - utcDate.getTime()) / 6e4;
}
