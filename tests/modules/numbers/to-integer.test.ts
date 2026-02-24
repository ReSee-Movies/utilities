import { toInteger } from '@/numbers/to-integer';
import { describe, expect, test } from 'vitest';

describe('numbers/toInteger()', () => {
  test('it converts values to an integer when possible', () => {
    expect(toInteger(123)).toEqual(123);
    expect(toInteger('456')).toEqual(456);
    expect(toInteger(false)).toEqual(NaN);
  });
});
