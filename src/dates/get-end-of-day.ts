/**
 * Returns a Date instance set to the end of the current day. An
 * optional seed date can also be provided, whose year-month-date
 * values will be used.
 */
export function getEndOfDay(options?: { date?: Date }) {
  const mutable = options?.date ? new Date(options.date) : new Date();
  mutable.setHours(23, 59, 59, 999);
  return mutable;
}
