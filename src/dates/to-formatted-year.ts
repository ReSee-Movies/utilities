import { toDate } from './to-date.js';


/**
 * Given an ISO date string or Date instance, the full four digit year
 * is returned.
 */
export function toFormattedYear(date: unknown) {
  const dateInst = toDate(date);

  return dateInst
    ? dateInst.getFullYear().toString()
    : undefined;
}
