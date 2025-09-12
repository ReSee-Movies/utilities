import { toISOString } from './to-iso-string.js';


/**
 * Runs the provided argument through `toDate` and, if a valid
 * date is returned, returns a datetime that has been recalculated
 * to local time.
 */
export function toLocalDateTimeString(date: unknown) {
  const dateStr = toISOString(date);

  if (!dateStr) {
    return undefined;
  }

  const utcDate = new Date(dateStr);
  const minOffset = utcDate.getTimezoneOffset();
  const localTime = new Date(utcDate.getTime() - minOffset * 60 * 1000);

  return toISOString(localTime)?.slice(0, -1);
}
