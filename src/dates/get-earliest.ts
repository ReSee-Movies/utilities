import { toDate } from './to-date';


/**
 * In an array of values that can be converted to a Date using `toDate`, return
 * the chronologically earliest value. It's like Math.min(), but for dates.
 */
export function getEarliest(dates: unknown[]) {
  const datesArray = dates
    .map((value) => toDate(value)?.getTime())
    .filter(Boolean) as number[];

  return datesArray.length ? new Date(Math.min(...datesArray)) : undefined;
}
