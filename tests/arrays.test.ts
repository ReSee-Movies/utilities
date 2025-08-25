import { describe, expect, test } from 'vitest';
import { areArraysEqual, AreArraysEqualOptions } from '@/arrays/are-arrays-equal';
import { chunkArray } from '@/arrays/chunk-arrays';
import { getRandomEntries } from '@/arrays/get-random-entries';
import { getRandomEntry } from '@/arrays/get-random-entry';
import { toArray } from '@/arrays/to-array';
import { toNonNullableArray } from '@/arrays/to-non-nullable-array';


describe('areArrayEqual()', () => {
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


describe('chunkArrays()', () => {
  test('it slices a large array into smaller chunks of a given size', () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    expect(
      chunkArray([], 3),
    ).to.deep.equal(
      [[]],
    );

    expect(
      chunkArray(testArray, 3),
    ).to.deep.equal(
      [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]],
    );

    expect(
      chunkArray(testArray, 10),
    ).to.deep.equal(
      [testArray],
    );
  });
});


describe('getRandomEntries()', () => {
  test('it will return a new array containing a seemingly-random assortment of values from the original', () => {
    const testSourceArray = Array.from(new Array(100), ((_, idx) => idx));
    const testSourceSet   = new Set(testSourceArray);

    const testResultArray = getRandomEntries(testSourceArray, 20);
    const testResultSet   = new Set(testResultArray);

    expect(
      testResultSet.size,
    ).to.equal(
      20,
      'The result set contains 20 distinct values',
    );

    expect(
      testSourceSet.intersection(testResultSet).size,
    ).to.equal(
      20,
      'All values in the result set are contained within the source set',
    );
  });
});


describe('getRandomEntry()', () => {
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


describe('toArray()', () => {
  test('it will always return an array', () => {
    expect(toArray([1, 2, 3])).to.deep.equal([1, 2, 3]);
    expect(toArray(1)).to.deep.equal([1]);
    expect(toArray(null)).to.deep.equal([null]);
  });
});


describe('toNonNullableArray', () => {
  test('it will always return an array with only non-nullable values', () => {
    expect(toNonNullableArray([1, undefined, 2, null, 3, false])).to.deep.equal([1, 2, 3, false]);
    expect(toNonNullableArray(1)).to.deep.equal([1]);
    expect(toNonNullableArray(null)).to.deep.equal([]);
  });
});
