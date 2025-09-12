import type { UrlQuerySerializableObject, UrlQuerySerializedObject } from '../typings/url-query-serialization';
import { serializeQueryValue } from './serialize-query-value.js';


/**
 * Config options for the {@link serializeQueryObject} method.
 */
export type SerializeQueryObjectOptions = {
  removeUndefined? : boolean;
  removeNull?      : boolean;
};


/**
 * Serializes an object so that it can be applied as URL query parameters.
 */
export function serializeQueryObject<
  S extends UrlQuerySerializableObject,
>(
  source  : S,
  options : SerializeQueryObjectOptions = {},
): UrlQuerySerializedObject<S> {
  const results: Record<string, unknown> = {};

  const {
    removeUndefined,
    removeNull,
  } = options;

  for (const entry of Object.entries(source)) {
    const key    = entry[0] as keyof S & string;
    const value  = entry[1];
    const serial = serializeQueryValue(value);

    if ((serial === undefined && removeUndefined) || (serial === null && removeNull)) {
      continue;
    }

    results[key] = serial;
  }

  return results as UrlQuerySerializedObject<S>;
}
