import { areSameDay } from './are-same-day';
import { toDate } from './to-date';


/**
 * Given an array of Date objects, group them by day. Each item in the
 * returned array will itself be an array containing Date objects that
 * share the same day, in ascending time value.
 *
 * @deprecated use `group-by-date()` instead.
 */
export function groupByDay(dates: unknown[]) {
  const sorted = dates
    .map((item) => toDate(item))
    .filter(Boolean)
    .sort((a, b) => (a?.getTime() ?? 0) - (b?.getTime() ?? 0)) as Date[];

  const result: Date[][] = [];

  for (const value of sorted) {
    const date = toDate(value);

    if (date) {
      const prev = result.at(-1);

      if (prev && areSameDay(date, prev?.at(0))) {
        prev.push(date);
      }
      else {
        result.push([date]);
      }
    }
  }

  return result;
}
