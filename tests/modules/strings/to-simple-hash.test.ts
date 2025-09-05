import { toSimpleHash } from '@/strings/to-simple-hash';
import { describe, expect, test } from 'vitest';

describe('strings/toSimpleHash()', () => {
  test('it generates a hash', () => {
    expect(toSimpleHash('the quick brown dog')).toEqual('0ljdir4');
    expect(toSimpleHash('the quick brown dog')).to.not.equal(toSimpleHash('the quick black dog'));
  });
});
