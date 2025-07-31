/**
 * Generates a 7 character hash for any string value. It's simple, fast. and very insecure (so
 * please don't go hashing passwords). Loosely based on Java's String.hashCode() method.
 *
 * @see https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
 */
export function toSimpleHash(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
  }

  // Convert to 32bit unsigned integer in base
  // 36 and pad with "0" to ensure length is 7.
  return (hash >>> 0).toString(36).padStart(7, '0');
}
