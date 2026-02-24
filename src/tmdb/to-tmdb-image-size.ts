import { isNumber } from '../numbers/is-number.js';

/**
 * Takes an integer or string and creates a string "size" for TMDB image assets.
 * Pass the POSITIVE_INFINITY constant for the "original" size.
 */
export function toTmdbImageSize(value: number | string): string {
  if (isNumber(value)) {
    return value === Number.POSITIVE_INFINITY ? 'original' : `w${ value }`;
  }

  return value.startsWith('w') || value === 'original' ? value : `w${ value }`;
}
