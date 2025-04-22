import { type MaybeRefOrGetter, toValue } from 'vue';
import { toInteger } from '../numbers/to-integer';
import { isString } from './is-string';


/**
 * Extracts a numerical ID from the beginning of a URL slug, returning the
 * value. -1 will be returned for all inputs that cannot be parsed.
 */
export function deslugify(value: MaybeRefOrGetter<unknown>) {
  const rawValue = toValue(value);

  const parsedValue = toInteger(
    isString(rawValue) ? parseInt(rawValue.match(/^(\d+)/)?.[0] ?? '-1') : rawValue,
  );

  return Number.isNaN(parsedValue) ? -1 : parsedValue;
}
