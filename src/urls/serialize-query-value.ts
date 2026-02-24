import { toNonNullableArray } from '../arrays/to-non-nullable-array.js';
import type {
  UrlQuerySerializableType,
  UrlQuerySerializableTypeToSerializedType,
} from '../typings/url-query-serialization';


/**
 * Prepares the values of an object to be serialized into a URL query.
 */
export function serializeQueryValue(value: string | number | boolean): string;
export function serializeQueryValue(value: null): null;
export function serializeQueryValue(value: undefined): undefined;
export function serializeQueryValue(value: string[] | number[]): string[];

export function serializeQueryValue<
  V extends UrlQuerySerializableType,
>(
  value: V,
): UrlQuerySerializableTypeToSerializedType<V>;

export function serializeQueryValue<T extends UrlQuerySerializableType>(value: T) {
  if (Array.isArray(value)) {
    return toNonNullableArray(value.map((item) => serializeQueryValue(item)));
  }

  if (value === null) {
    return null;
  }

  if (value === undefined) {
    return undefined;
  }

  return encodeURIComponent(String(value));
}
