/**
 * Takes a TMDB "size" value for movie poster, actor headshots, or whatever, and
 * returns the integer value portion. For "original" images, the POSITIVE_INFINITY
 * constant is returned (so that it is always largest), and for anything else
 * undefined is returned.
 */
export function fromTmdbImageSize(value: string) {
  if (value === 'original') {
    return Number.POSITIVE_INFINITY;
  }

  if (value.match(/w[0-9]+/)) {
    return parseInt(value.substring(1));
  }

  return undefined;
}
