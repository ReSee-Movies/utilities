import { toDate } from './to-date';


/**
 * Given two arguments, `dateA` and `dateB`, that can both be converted to
 * Date instances via `toDate()`, return a boolean that indicates whether
 * `dateA` is chronologically the same or after than `dateB`.
 */
export function isSameOrLater(dateA: unknown, dateB: unknown) {
  const dateInstA = toDate(dateA);
  const dateInstB = toDate(dateB);

  return dateInstA && dateInstB ? dateInstA.getTime() >= dateInstB.getTime() : false;
}
