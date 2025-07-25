/**
 * Config options for the `isString` utility.
 */
export type IsStringOptions = {
  withContent?: boolean;
};

/**
 * A simple type guard for checking whether a value is a string. Optionally,
 * the test can be narrowed to include only strings with some sort of content
 * other than whitespace.
 */
export function isString(value: unknown, options?: IsStringOptions): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  return options?.withContent === true ? value.trim().length > 0 : true;
}
