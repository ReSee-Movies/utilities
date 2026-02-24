import { isObjectLike } from '@/objects/is-object-like';
import { describe, expect, test } from 'vitest';


describe('objects/isObjectLike()', () => {
  class TestClass {}

  test('it checks that the identity of the argument is an object', () => {
    expect(isObjectLike({})).toEqual(true);
    expect(isObjectLike(new TestClass())).toEqual(true);

    expect(isObjectLike([])).toEqual(false);
    expect(isObjectLike(null)).toEqual(false);
  });
});
