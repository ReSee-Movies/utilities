import { getRandomEntries } from '#arrays/get-random-entries.js';
import { describe, expect, test } from 'vitest';

describe('arrays/getRandomEntries()', () => {
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
