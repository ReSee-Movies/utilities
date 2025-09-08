import { intersection } from '@/sets/intersection';
import { describe, expect, test } from 'vitest';

describe('sets/intersection()', () => {
  test('it returns the intersection between two sets', () => {
    expect(
      intersection(new Set(['a', 'b', 'c']), new Set(['a', 'c', 'd'])),
    ).to.deep.equal(new Set(['a', 'c']));
  });
});
