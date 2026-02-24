import { chunkArray } from '#arrays/chunk-arrays.js';
import { describe, expect, test } from 'vitest';

describe('arrays/chunkArray()', () => {
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
