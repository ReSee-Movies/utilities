import { isNumber } from '../numbers/is-number.js';
import { isString } from '../strings/is-string.js';

/**
 * Config options for the {@link fromTmdbImageSize} utility method.
 */
export type FromTmdbImageSizeOptions = {
  /**
   * Causes the "original" image size to return undefined instead
   * of POSITIVE_INFINITY.
   */
  originalIsUndefined?: boolean;
};

/**
 * Takes a TMDB "size" value for movie poster, actor headshots, or whatever, and
 * returns the integer value portion. For the "original" image size, the POSITIVE_INFINITY
 * constant is returned (so that it is always largest when sorted against a list of
 * other size values) by default, and for anything else undefined is returned.
 */
export function fromTmdbImageSize(value: unknown, options?: FromTmdbImageSizeOptions): number | undefined {
  if (isNumber(value)) {
    return value;
  }

  if (isString(value)) {
    if (value === 'original') {
      return options?.originalIsUndefined ? undefined : Number.POSITIVE_INFINITY;
    }

    const match = value.match(/w?(\d+)/);

    if (match) {
      return parseInt(match[1]);
    }
  }

  return undefined;
}
