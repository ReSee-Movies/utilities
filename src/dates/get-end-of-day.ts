export type GetEndOfDayOptions = {
  /**
   * A seed date, whose year-month-date values will be used.
   */
  date?: Date;

  /**
   * A boolean that indicates whether the created date's timezone
   * offset (as all Javascript dates are local) will be added to
   * the date instance. This has the effect of causing the resulting
   * date to "be in UTC" without such a thing _really_ existing in JS.
   * Most importantly, this allows dates created with this method to
   * line up with server values (most good servers have their TZ set
   * to GMT) for operations like `toUTCString()`.
   *
   * @default true
   */
  shiftEpoch?: boolean;
};

/**
 * Returns a Date instance set to the end of the current day.
 */
export function getEndOfDay(options?: GetEndOfDayOptions) {
  const mutable = options?.date ? new Date(options.date) : new Date();
  mutable.setHours(23, 59, 59, 999);

  if (options?.shiftEpoch !== false) {
    mutable.setMinutes(-1 * mutable.getTimezoneOffset());
  }

  return mutable;
}
