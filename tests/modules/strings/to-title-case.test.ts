import { toTitleCase } from '@/strings/to-title-case';
import { describe, expect, test } from 'vitest';

describe('strings/toTitleCase()', () => {
  test('it will Title Case the words in a string', () => {
    expect(toTitleCase('the quick brown fox')).toEqual('The quick brown fox');
    expect(toTitleCase('the quick brown fox', false)).toEqual('The Quick Brown Fox');
  });
});
