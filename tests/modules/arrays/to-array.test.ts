import { toArray } from '@/arrays/to-array';
import { describe, expect, test } from 'vitest';

describe('arrays/toArray()', () => {
  test('it will always return an array', () => {
    expect(toArray([1, 2, 3])).to.deep.equal([1, 2, 3]);
    expect(toArray(1)).to.deep.equal([1]);
    expect(toArray(null)).to.deep.equal([null]);
  });
});
