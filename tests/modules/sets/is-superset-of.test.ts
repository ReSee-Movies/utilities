import { isSupersetOf } from '@/sets/is-superset-of';
import { describe, expect, test } from 'vitest';

describe('sets/isSupersetOf()', () => {
  test('it determines whether one Set is a superset of another', () => {
    expect(isSupersetOf(new Set(['a', 'b']), new Set(['a', 'c', 'd']))).toEqual(false);
    expect(isSupersetOf(new Set(['a', 'b', 'c']), new Set(['a', 'b', 'd', 'c']))).toEqual(true);
  });
});
