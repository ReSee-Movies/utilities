/**
 * Takes an integer and creates a string "size" for TMDB image assets. Pass
 * the POSITIVE_INFINITY constant for the "original" size of things.
 */
export function toTmdbImageSize(value: number) {
  return value === Number.POSITIVE_INFINITY ? 'original' : `w${ value }`;
}
