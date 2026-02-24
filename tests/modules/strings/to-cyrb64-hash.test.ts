import { toCyrb64Hash } from '@/strings/to-cyrb64-hash';
import { describe, expect, test } from 'vitest';

describe('strings/toCyrb64Hash()', () => {
  test('it generates a hash', () => {
    expect(toCyrb64Hash('the quick brown dog')).toEqual('07e0iao0nxkvmg');
    expect(toCyrb64Hash('the quick brown dog')).to.not.equal(toCyrb64Hash('the quick black dog'));
  });
});
