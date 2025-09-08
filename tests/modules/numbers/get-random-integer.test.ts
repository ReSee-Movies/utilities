import { getRandomInteger } from '@/numbers/get-random-integer';
import { describe, expect, test } from 'vitest';

describe('numbers/getRandomInteger()', () => {
  test('it returns a random number between the min and max', () => {
    const results = new Set<number>();

    for (let i = 0; i < 100; i += 1) {
      results.add(getRandomInteger(1, 100));
    }

    expect(results.size).to.be.greaterThan(1);

    const min = Math.min(...Array.from(results));
    const max = Math.max(...Array.from(results));

    expect(min).to.be.greaterThanOrEqual(1);
    expect(max).to.be.lessThan(100);

    expect(() => getRandomInteger(-1, 100)).to.throw();
    expect(() => getRandomInteger(100, -1)).to.throw();
  });
});
