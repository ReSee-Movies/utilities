import { areArraysEqual, AreArraysEqualOptions } from '@/arrays/are-arrays-equal';
import { describe, expect, test } from 'vitest';

describe('arrays/areArrayEqual()', () => {
  test('it correctly compares two arrays which contain the same values at the same indices', () => {
    expect(
      areArraysEqual([], []),
    ).to.equal(true);

    expect(
      areArraysEqual(['A', 'B'], ['A', 'B']),
    ).to.equal(true);

    expect(
      areArraysEqual(['A', 'B'], ['A']),
    ).to.equal(false);

    expect(
      areArraysEqual(['A', 'B'], ['B', 'A']),
    ).to.equal(false);
  });

  test('it correctly compares two array which contain the same values at different indices when configured to do so', () => {
    const options: AreArraysEqualOptions = {
      ignoreOrder: true,
    };

    expect(
      areArraysEqual([], [], options),
    ).to.equal(true);

    expect(
      areArraysEqual(['A', 'B'], ['A', 'B'], options),
    ).to.equal(true);

    expect(
      areArraysEqual(['A', 'B'], ['A'], options),
    ).to.equal(false);

    expect(
      areArraysEqual(['A', 'B'], ['B', 'A'], options),
    ).to.equal(true);
  });
});
