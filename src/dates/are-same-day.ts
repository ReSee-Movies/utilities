/**
 * Compares the date, month, and year values of two Date objects to
 * check if they describe the same day.
 *
 * @deprecated use `areDatesEqual()` instead.
 */
export function areSameDay(dateA: Date | null | undefined, dateB: Date | null | undefined) {
  return dateA && dateB
    && dateA.getDate() === dateB.getDate()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getFullYear() === dateB.getFullYear();
}
