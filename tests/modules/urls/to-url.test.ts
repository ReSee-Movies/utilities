import { toUrl } from '@/urls/to-url';
import { describe, expect, test } from 'vitest';

describe('urls/toUrl()', () => {
  test('it correctly identifies URL instances, and prepends a baseURL when needed', () => {
    const baseUrl     = 'https://www.noexist.co';
    const relativeUrl = '/path/to-resource';
    const fullUrl     = baseUrl + relativeUrl;

    expect(toUrl(relativeUrl, baseUrl)).toEqual(fullUrl);
    expect(toUrl(fullUrl, 'this-would-error-if-used')).toEqual(fullUrl);
    expect(toUrl(new URL(fullUrl), 'this-would-error-if-used')).toEqual(fullUrl);

    // @ts-expect-error - intentionally passing incorrect integer argument
    expect(toUrl(123, baseUrl)).toEqual(null);
  });
});
