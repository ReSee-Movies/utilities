import { isString } from '#strings/is-string.js';

/**
 * Validates that the provided argument is either a URL instance,
 * or a string that could be supplied to URL.
 */
export function isUrl(value: unknown): value is string | URL {
  if (value instanceof URL) {
    return true;
  }

  if (isString(value)) {
    try {
      new URL(value);
      return true;
    }
    catch {
      // no-op
    }
  }

  return false;
}
