/**
 * Names of the different segments of a datetime value.
 */
export type DatePart = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';


/**
 * Add or subtract the given units from the supplied Date. This does not modify the
 * provided date, a new instance is returned.
 */
export function modifyDate(date: Date, part: DatePart, value: number) {
  const mutable = new Date(date);

  switch (part) {
    case 'year': mutable.setFullYear(mutable.getFullYear() + value); break;
    case 'month': mutable.setMonth(mutable.getMonth() + value); break;
    case 'day': mutable.setDate(mutable.getDate() + value); break;
    case 'hour': mutable.setHours(mutable.getHours() + value); break;
    case 'minute': mutable.setMinutes(mutable.getMinutes() + value); break;
    case 'second': mutable.setSeconds(mutable.getSeconds() + value); break;
    case 'millisecond': mutable.setMilliseconds(mutable.getMilliseconds() + value); break;
  }

  return mutable;
}
