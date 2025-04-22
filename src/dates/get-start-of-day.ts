/**
 * Returns a Date instance set to the beginning of the current day. An
 * optional seed date can also be provided, whose year-month-date values
 * will be used.
 */
export function getStartOfDay(options?: { date?: Date }) {
  const mutable = options?.date ? new Date(options.date) : new Date();
  mutable.setHours(0, 0, 0, 0);
  return mutable;
}
