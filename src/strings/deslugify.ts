import { toInteger } from '../numbers/to-integer';
import { isString } from './is-string';


/**
 * Extracts a numerical ID from the beginning of a URL slug, returning the
 * value. -1 will be returned for all inputs that cannot be parsed.
 */
export function deslugify(value: unknown) {
  const parsedValue = toInteger(
    isString(value) ? parseInt(value.match(/^(\d+)/)?.[0] ?? '-1') : value,
  );

  return Number.isNaN(parsedValue) ? -1 : parsedValue;
}
