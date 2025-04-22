import { toDate } from './to-date';


/**
 * In an array of values that can be converted to a Date using `toDate`, return
 * the chronologically latest value. Its like Math.max(), but for dates.
 */
export function getLatest(dates: unknown[]) {
  const datesArray = dates
    .map((value) => toDate(value)?.getTime())
    .filter(Boolean) as number[];

  return datesArray.length ? new Date(Math.max(...datesArray)) : undefined;
}
