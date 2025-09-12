import { toDate } from './to-date.js';


/**
 * Runs the provided argument through `toDate` and, if a valid
 * date is returned, returns an ISO 8601 timestamp.
 */
export function toISOString(date: unknown) {
  const dateInst = toDate(date);
  const dateStr = dateInst ? dateInst.toISOString() : undefined;

  return dateStr ? dateStr.slice(0, -5) + 'Z' : undefined;
}
