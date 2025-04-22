import { areDatesEqual, type AreDatesEqualPrecision } from './are-dates-equal';
import { toDate } from './to-date';

/**
 * Given an array of objects that each contain a Date or parsable date-like property,
 * create a new, two-dimensional array that groups those objects by date, up to the
 * given precision.
 *
 * Note: this method requires that the provided source first be sorted in the direction
 * of the desired result (either ascending or descending).
 */
export function groupByDate<T>(source: T[], dateKey: keyof T, limit: AreDatesEqualPrecision = 'day'): T[][] {
  return source
    .reduce(
      (recordAccumulator, currentRecord) => {
        const previous = recordAccumulator.at(-1)?.at(-1)?.[dateKey];
        const current  = currentRecord[dateKey];

        if (!previous) {
          recordAccumulator.push([currentRecord]);
        }
        else {
          const previousDate = toDate(previous);
          const currentDate  = toDate(current);

          if (areDatesEqual(previousDate, currentDate, limit)) {
            recordAccumulator.at(-1)?.push(currentRecord);
          }
          else {
            recordAccumulator.push([currentRecord]);
          }
        }

        return recordAccumulator;
      },
      [] as T[][],
    );
}
