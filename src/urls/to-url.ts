import { isString } from '#strings/is-string.js';
import { isUrl } from './is-url.js';

/**
 * Ensures that the provided string is a valid URL.
 */
export function toUrl(value: URL | string | null | undefined, baseUrl: string): string | null {
  if (isString(value)) {
    return isUrl(value) ? value : new URL(value, baseUrl).href;
  }

  if (value instanceof URL) {
    return value.href;
  }

  return null;
}
