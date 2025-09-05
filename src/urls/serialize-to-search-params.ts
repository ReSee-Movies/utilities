import type { UrlQuerySerializableObject } from '../typings/url-query-serialization';
import { serializeQueryObject } from './serialize-query-object';

/**
 * Feeds to result of {@link serializeQueryObject} into a URLSearchParams instance.
 */
export function serializeToSearchParams(source: UrlQuerySerializableObject): URLSearchParams {
  const results   = serializeQueryObject(source, { removeUndefined: true, removeNull: true });
  const urlParams = new URLSearchParams();

  Object.entries(results).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => urlParams.append(key, item));
    }
    else if (value) {
      urlParams.append(key, value);
    }
  });

  return urlParams;
}
