import { areEqual } from '#objects/are-equal.js';
import { describe, expect, test } from 'vitest';

describe('objects/areEqual()', () => {
  test('it compares two arguments', () => {
    expect(areEqual('a', 'a')).toEqual(true);
    expect(areEqual(1, 1)).toEqual(true);
    expect(areEqual([1, 2], [1, 2])).toEqual(true);
    expect(areEqual('', false)).toEqual(false);
  });
});
