import { isUrl } from '@/urls/is-url';
import { describe, expect, test } from 'vitest';

describe('urls/isURL()', () => {
  test('it correctly identifies URL instances, and strings that contain URL data', () => {
    expect(isUrl(new URL('https://www.noexist.co/path/to-resource'))).to.equal(true);
    expect(isUrl('https://www.noexist.co/path/to-resource')).to.equal(true);
    expect(isUrl('/path/to-resource')).to.equal(false);
    expect(isUrl(123)).to.equal(false);
  });
});
