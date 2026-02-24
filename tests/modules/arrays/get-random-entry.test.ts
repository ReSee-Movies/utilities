import { getRandomEntry } from '@/arrays/get-random-entry';
import { describe, expect, test } from 'vitest';

describe('arrays/getRandomEntry()', () => {
  test('it will return one seemingly-random value from an array', () => {
    const source = Array.from(new Array(100), ((_, idx) => idx));
    const result = new Set<number>();

    // Technically brittle, yes, because this is technically possible.
    // Odds are ~extraordinary~ low that in the choice of 100 possible
    // values, the same value will be chosen 100 times though.

    for (let i = 0; i < 100; i += 1) {
      result.add(getRandomEntry(source));
    }

    expect(result.size).to.be.greaterThan(1);
  });
});
