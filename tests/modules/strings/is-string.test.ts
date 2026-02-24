import { isString } from '#strings/is-string.js';
import { describe, expect, test } from 'vitest';

describe('strings/isString()', () => {
  test('it correctly identifies a string', () => {
    expect(isString(null)).toEqual(false);
    expect(isString(false)).toEqual(false);
    expect(isString(123)).toEqual(false);

    expect(isString('Hello World')).toEqual(true);
    expect(isString('Hello World', { withContent: true })).toEqual(true);

    expect(isString('')).toEqual(true);
    expect(isString('', { withContent: true })).toEqual(false);
    expect(isString('  ', { withContent: true })).toEqual(false);
  });
});
