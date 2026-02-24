import { isUUID } from '@/strings/is-uuid';
import { describe, expect, test } from 'vitest';

describe('strings/isUUID()', () => {
  test('it correctly identifies a v4 UUID', () => {
    expect(isUUID('abcd1234-ab12-4ab1-8abc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-4ab1-9abc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-4ab1-Aabc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-4ab1-Babc-abcdef123456')).toBe(true);
    expect(isUUID('abcd1234-ab12-5ab1-8abc-abcdef123456')).toBe(false);
    expect(isUUID('')).toBe(false);
    expect(isUUID(10)).toBe(false);
  });
});
