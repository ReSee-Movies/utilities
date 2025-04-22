export type AreDatesEqualPrecision = 'year' | 'month' | 'day' | 'hour' | 'minute';

/**
 * Compares two date values to determine if they are the same to the given precision.
 */
export function areDatesEqual(
  dateA: Date | null | undefined,
  dateB: Date | null | undefined,
  limit: AreDatesEqualPrecision = 'minute',
) {
  if (!(dateA && dateB)) {
    return false;
  }

  const areSameYear = dateA.getUTCFullYear() === dateB.getUTCFullYear();

  if (!areSameYear || limit === 'year') {
    return areSameYear;
  }

  const areSameMonth = dateA.getUTCMonth() === dateB.getUTCMonth();

  if (!areSameMonth || limit === 'month') {
    return areSameMonth;
  }

  const areSameDay = dateA.getUTCDate() === dateB.getUTCDate();

  if (!areSameDay || limit === 'day') {
    return areSameDay;
  }

  const isSameHour = dateA.getUTCHours() === dateB.getUTCHours();

  if (!isSameHour || limit === 'hour') {
    return isSameHour;
  }

  return dateA.getUTCMinutes() === dateB.getUTCMinutes();
}
