/**
 * Adds a backslash (/) to the beginning of a string if it does
 * not already have one.
 */
export function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${ path }`;
}
