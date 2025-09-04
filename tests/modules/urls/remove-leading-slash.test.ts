import { removeLeadingSlash } from '@/urls/remove-leading-slash';
import { describe, expect, test } from 'vitest';

describe('urls/removeLeadingSlash()', () => {
  test('it removes a forward slash from the beginning of a string if present', () => {
    expect(removeLeadingSlash('/the-quick-brown-dog')).to.equal('the-quick-brown-dog');
    expect(removeLeadingSlash('the-quick-brown-dog')).to.equal('the-quick-brown-dog');
  });
});
