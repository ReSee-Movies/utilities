import { isString } from './is-string';

const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

/**
 * The length of a v4 UUID string.
 */
export const UUIDv4Length = 36;

/**
 * Tests whether the provided value has the shape of a version 4 UUID value.
 */
export function isUUID(value: unknown): value is string {
  return isString(value) && value.length === UUIDv4Length && !!value.match(v4);
}
