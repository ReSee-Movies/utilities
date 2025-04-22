/**
 * Capitalizes the first letter of the provided string. Optionally, each
 * space-delimited "word" in the provided string can have its first letter
 * capitalized.
 */
export function toTitleCase(value: string, firstWordOnly = true): string {
  if (firstWordOnly) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
