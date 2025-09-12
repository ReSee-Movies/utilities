import { isString } from './is-string.js';
import { slugify } from './slugify.js';

/**
 * Config options for the `isSubstringOf` utility.
 */
export type IsSubstringOfOptions = {
  caseSensitive? : boolean;
  simplified?    : boolean;
};

/**
 * Tests if one string is a substring of another. By default, this performs
 * a case-insensitive comparison. A case-sensitive comparison can be performed
 * by passing `caseSensitive: true` in the "options" argument. If `simplified: true`
 * is provided in the "options" argument, then the strings will first be slugified
 * (removing special characters, diacritics, etc.) and then compared.
 */
export function isSubstringOf(testString: unknown, targetString: string, options?: IsSubstringOfOptions): boolean {
  if (!isString(testString)) {
    return false;
  }

  if (options?.caseSensitive === true) {
    return targetString.includes(testString);
  }

  if (options?.simplified === true) {
    return slugify(targetString).includes(slugify(testString));
  }

  return targetString.toLowerCase().includes(testString.toLowerCase());
}
