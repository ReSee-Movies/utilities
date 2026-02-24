import { toNonNullableArray } from '#arrays/to-non-nullable-array.js';
import { describe, expect, test } from 'vitest';

describe('arrays/toNonNullableArray', () => {
  test('it will always return an array with only non-nullable values', () => {
    expect(toNonNullableArray([1, undefined, 2, null, 3, false])).to.deep.equal([1, 2, 3, false]);
    expect(toNonNullableArray(1)).to.deep.equal([1]);
    expect(toNonNullableArray(null)).to.deep.equal([]);
  });
});
