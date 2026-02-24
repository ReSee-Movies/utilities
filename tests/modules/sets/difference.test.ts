import { difference } from '#sets/difference.js';
import { describe, expect, test } from 'vitest';

describe('sets/difference()', () => {
  test('it returns the difference between two sets', () => {
    expect(
      difference(new Set(['a', 'b', 'c']), new Set(['a', 'c', 'd'])),
    ).to.deep.equal(new Set(['b']));
  });
});
