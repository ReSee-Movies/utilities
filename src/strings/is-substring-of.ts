import { isString } from './is-string';

/**
 * Config options for the `isSubstringOf` utility.
 */
export type IsSubstringOfOptions = {
  caseSensitive?: boolean;
};

/**
 * Tests is one string is a substring of another. By default, this performs
 * a case-insensitive comparison.
 */
export function isSubstringOf(testString: unknown, targetString: string, options?: IsSubstringOfOptions): boolean {
  if (!isString(testString)) {
    return false;
  }

  if (options?.caseSensitive === true) {
    return targetString.includes(testString);
  }

  return targetString.toLowerCase().includes(testString.toLowerCase());
}
