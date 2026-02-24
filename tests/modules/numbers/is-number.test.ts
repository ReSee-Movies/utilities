import { isNumber } from '@/numbers/is-number';
import { describe, expect, test } from 'vitest';

describe('numbers/isNumber()', () => {
  test('it correctly identifies a number', () => {
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(false)).toEqual(false);
    expect(isNumber(123)).toEqual(true);
  });
});
