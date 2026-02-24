import { getImageUrl } from '@/images/get-image-url';
import { normalizeImageFileDescriptor } from '@/images/normalize-image-file-descriptor';
import { DefaultBaseUrl as DefaultReseeBaseUrl, DirectusFileDescriptor } from '@/resee/get-media-asset-url';
import { DefaultBaseUrl as DefaultTmdbBaseUrl, TmdbFileDescriptor } from '@/tmdb/get-tmdb-image-url';
import { describe, expect, test } from 'vitest';


describe('images/getImageUrl()', () => {
  test('it creates a URL from one of several sources', () => {
    const reseeBaseUrl = DefaultReseeBaseUrl;
    const tmdbBaseUrl  = DefaultTmdbBaseUrl;

    const exactString = 'https://noexist.co/img.png';
    const tmdbString  = 'img.png';
    const descriptor  = normalizeImageFileDescriptor(tmdbString);

    const directusA: DirectusFileDescriptor = {
      id                : 'resee-img-a.png',
      filename_download : undefined,
    };

    const directusB: DirectusFileDescriptor = {
      id                : 'resee-img-b',
      filename_download : 'test-img.png',
      description       : 'Test Description',
      width             : 500,
      height            : 500,
    };

    const tmdbA: TmdbFileDescriptor = {
      filename : null,
    };

    const tmdbB: TmdbFileDescriptor = {
      filename : '/tmdb-img.png',
      width    : 'w300',
    };

    expect(getImageUrl(exactString)).toEqual(exactString);
    expect(getImageUrl(tmdbString)).toEqual(tmdbBaseUrl + 'original/' + tmdbString);
    expect(getImageUrl(descriptor)).toEqual(tmdbBaseUrl + 'original/' + tmdbString);
    expect(getImageUrl(directusA)).toEqual(reseeBaseUrl + 'resee-img-a.png');
    expect(getImageUrl(directusB)).toEqual(reseeBaseUrl + 'resee-img-b/test-img.png?height=500&width=500');
    expect(getImageUrl(tmdbA)).toEqual('');
    expect(getImageUrl(tmdbB)).toEqual(tmdbBaseUrl + 'w300/tmdb-img.png');

    expect(getImageUrl(descriptor, { tmdbBaseUrl: 'https://test.bar/' })).toEqual('https://test.bar/original/' + tmdbString);
    expect(getImageUrl(directusA, { reseeBaseUrl: 'https://test.foo/' })).toEqual('https://test.foo/resee-img-a.png');

    // @ts-expect-error - intentionally passing bad data
    expect(getImageUrl({ identifier: 'foo', sourceType: 'foo' })).toEqual('');
  });
});
