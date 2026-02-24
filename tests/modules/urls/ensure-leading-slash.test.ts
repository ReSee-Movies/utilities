import { ensureLeadingSlash } from '@/urls/ensure-leading-slash';
import { describe, expect, test } from 'vitest';

describe('urls/ensureLeadingSlash()', () => {
  test('it adds a forward slash to the beginning of a string if one is not already present', () => {
    expect(ensureLeadingSlash('the-quick-brown-dog')).to.equal('/the-quick-brown-dog');
    expect(ensureLeadingSlash('/the-quick-brown-dog')).to.equal('/the-quick-brown-dog');
  });
});
