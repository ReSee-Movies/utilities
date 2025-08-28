/**
 * Removes a backslash (/) from the beginning of a string if present.
 */
export function removeLeadingSlash(path: string): string {
  return path.startsWith('/') ? path.substring(1) : path;
}
