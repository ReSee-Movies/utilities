/**
 * Adds a backslash (/) to the beginning of a string if it does
 * not already have one.
 */
export function ensureLeadingSlash(path: string) {
  return `${ path.charAt(0) === '/' ? '' : '/' }${ path }`;
}
