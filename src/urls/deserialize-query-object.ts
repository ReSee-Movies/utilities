import type {
  UrlQueryDeserializedObject,
  UrlQuerySerializationMap,
  UrlQuerySerializedObject,
} from '../typings/url-query-serialization';
import { deserializeQueryValue } from './deserialize-query-value.js';


/**
 * Config options for the {@link deserializeQueryObject} method.
 */
export type DeserializeQueryObjectOptions = {
  keepUndefined?: boolean;
}


/**
 * Inflate a serialized object, using the provided SerializationMap as the guide
 * to how values should be interpreted and cast.
 */
export function deserializeQueryObject<
  S extends UrlQuerySerializedObject<M>,
  M extends UrlQuerySerializationMap,
>(
  source  : S,
  mapping : M,
  options : DeserializeQueryObjectOptions = {},
): UrlQueryDeserializedObject<M> {
  const results: Record<string, unknown> = {};

  for (const entry of Object.entries(source)) {
    const key   = entry[0] as keyof S & keyof M & string;
    const value = entry[1];

    if (options.keepUndefined === true || value !== undefined) {
      results[key] = key in mapping
        ? deserializeQueryValue(value, mapping[key].type)
        : value;
    }
  }

  return results as UrlQueryDeserializedObject<M>;
}
