import { isSubstringOf } from '@/strings/is-substring-of';
import { describe, expect, test } from 'vitest';

describe('strings/isSubstringOf()', () => {
  test('it correctly identifies whether one string appears within another', () => {
    expect(isSubstringOf('quick brown', 'the quick brown dog')).toEqual(true);
    expect(isSubstringOf('Quick Brown', 'the quick brown dog')).toEqual(true);
    expect(isSubstringOf('quick black', 'the quick brown dog')).toEqual(false);
    expect(isSubstringOf(null, 'the quick brown dog')).toEqual(false);

    expect(isSubstringOf('Quick Brown', 'The Quick Brown Dog', { caseSensitive: true })).toEqual(true);
    expect(isSubstringOf('quick brown', 'The Quick Brown Dog', { caseSensitive: true })).toEqual(false);

    expect(isSubstringOf('quick, "brown"', 'the quick brown dog', { simplified: true })).toEqual(true);
  });
});
