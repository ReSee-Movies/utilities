import { isString } from '@/strings/is-string';
import { describe, expect, test } from 'vitest';

describe('strings/isString()', () => {
  test('it correctly identifies a string', () => {
    expect(isString('Hello World')).toBe(true);
    expect(isString('')).toBe(true);
  });
});
