import { ensureLeadingSlash } from '@/urls/ensure-leading-slash';
import { isUrl } from '@/urls/is-url';
import { removeLeadingSlash } from '@/urls/remove-leading-slash';
import { describe, expect, test } from 'vitest';


describe('ensureLeadingSlash()', () => {
  test('it adds a forward slash to the beginning of a string if one is not already present', () => {
    expect(ensureLeadingSlash('the-quick-brown-dog')).to.equal('/the-quick-brown-dog');
    expect(ensureLeadingSlash('/the-quick-brown-dog')).to.equal('/the-quick-brown-dog');
  });
});


describe('removeLeadingSlash()', () => {
  test('it removes a forward slash from the beginning of a string if present', () => {
    expect(removeLeadingSlash('/the-quick-brown-dog')).to.equal('the-quick-brown-dog');
    expect(removeLeadingSlash('the-quick-brown-dog')).to.equal('the-quick-brown-dog');
  });
});


describe('isURL()', () => {
  test('it correctly identifies URL instances, and strings that contain URL data', () => {
    expect(isUrl(new URL('https://www.noexist.co/path/to-resource'))).to.equal(true);
    expect(isUrl('https://www.noexist.co/path/to-resource')).to.equal(true);
    expect(isUrl('/path/to-resource')).to.equal(false);
    expect(isUrl(123)).to.equal(false);
  });
});
