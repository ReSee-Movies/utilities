import { deslugify } from '@/strings/deslugify';
import { describe, expect, test } from 'vitest';

describe('strings/deslugify()', () => {
  test('it returns the numeric prefix of a string', () => {
    expect(deslugify('123-foo-bar')).toEqual(123);
    expect(deslugify('foo-bar')).toEqual(-1);
    expect(deslugify(false)).toEqual(-1);
  });
});
