import { isNumber } from '#numbers/is-number.js';
import { isString } from '#strings/is-string.js';

/**
 * Tries to create a Date instance out of a variety of inputs:
 * a number, a number string, a string, or another Date instance.
 *
 * A valid Date instance will always be returned. Otherwise,
 * undefined is returned.
 */
export function toDate(date: unknown) {
  let dateInst: Date | null = null;

  if (date instanceof Date) {
    dateInst = new Date(date);
  }
  else if (isNumber(date)) {
    dateInst = new Date(date);
  }
  else if (isString(date)) {
    dateInst = new Date(date.match(/^-?\d+$/) ? parseInt(date) : date);
  }

  return dateInst && !isNaN(dateInst.getFullYear())
    ? dateInst
    : undefined;
}
