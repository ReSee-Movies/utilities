import { isDisjointFrom } from '@/sets/is-disjoint-from';
import { describe, expect, test } from 'vitest';

describe('sets/isDisjointFrom()', () => {
  test('it determines whether two sets are disjoint from each other', () => {
    expect(isDisjointFrom(new Set(['a', 'b', 'c']), new Set(['a', 'c', 'd']))).toEqual(false);
    expect(isDisjointFrom(new Set(['a', 'b', 'c']), new Set(['d', 'e', 'f']))).toEqual(true);
  });
});
