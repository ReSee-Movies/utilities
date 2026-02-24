import { isNumber } from '#numbers/is-number.js';
import { isString } from '#strings/is-string.js';
import type {
  UrlQuerySerializableConstructor,
  UrlQuerySerializableConstructorToType,
} from '../typings/url-query-serialization';


/**
 * Given a serialized value, attempts to deserialize it to the described type.
 */
export function deserializeQueryValue(value: unknown, type: StringConstructor): string | undefined;
export function deserializeQueryValue(value: unknown, type: NumberConstructor): number | undefined;
export function deserializeQueryValue(value: unknown, type: BooleanConstructor): boolean | undefined;
export function deserializeQueryValue(value: unknown, type: StringConstructor[]): string[] | undefined;
export function deserializeQueryValue(value: unknown, type: NumberConstructor[]): number[] | undefined;
export function deserializeQueryValue(value: unknown, type: null): null;
export function deserializeQueryValue(value: unknown, type: undefined): undefined;

export function deserializeQueryValue<
  T extends UrlQuerySerializableConstructor,
>(
  value : unknown,
  type  : T,
): UrlQuerySerializableConstructorToType<T>;

export function deserializeQueryValue<T extends UrlQuerySerializableConstructor>(
  value : unknown,
  type  : T,
) {
  // Interpret string query values
  if (isString(value)) {
    if (type === String) {
      return decodeURIComponent(value);
    }

    if (type === Number) {
      const parsed = parseFloat(value);
      return Number.isNaN(parsed) ? undefined : parsed;
    }

    if (type === Boolean) {
      const lowercase = value.toLowerCase().trim();

      if (['true', 'yes', '1'].includes(lowercase)) {
        return true;
      }

      if (['false', 'no', '0'].includes(lowercase)) {
        return false;
      }

      return undefined;
    }

    if (Array.isArray(type)) {
      if (type[0] === String) {
        return [decodeURIComponent(value)];
      }

      if (type[0] === Number) {
        const result = deserializeQueryValue(value, Number);
        return result ? [result] : undefined;
      }
    }
  }

  // Interpret arrays of query values
  if (Array.isArray(value) && Array.isArray(type)) {
    if (type[0] === String) {
      return value
        .filter((item) => isString(item))
        .map((item) => decodeURIComponent(item));
    }

    if (type[0] === Number) {
      return value
        .map((item) => deserializeQueryValue(item, Number))
        .filter((item) => isNumber(item));
    }
  }

  // Interpret nulls (key only, no value) as boolean true
  if (value === null && type === Boolean) {
    return true;
  }

  // Explicitly asking for a null
  if (type === null) {
    return null;
  }

  // Explicitly asking for an undefined
  if (type === undefined) {
    return undefined;
  }

  throw new Error(
    `[deserializeQueryValue] Cannot convert the "${ typeof value }" value "${ value }" to type "${ type }"`,
  );
}
