import { isString } from './is-string';

const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

/**
 * Tests whether the provided value has the shape of a version 4 UUID value.
 */
export function isUUID(value: unknown): value is string {
  return isString(value) && !!value.match(v4);
}
