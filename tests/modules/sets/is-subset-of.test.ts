import { isSubsetOf } from '#sets/is-subset-of.js';
import { describe, expect, test } from 'vitest';

describe('sets/isSubsetOf()', () => {
  test('it determines whether one Set is a subset of another', () => {
    expect(isSubsetOf(new Set(['a', 'b']), new Set(['a', 'c', 'd']))).toEqual(false);
    expect(isSubsetOf(new Set(['a', 'b']), new Set(['a', 'b', 'c']))).toEqual(true);
  });
});
