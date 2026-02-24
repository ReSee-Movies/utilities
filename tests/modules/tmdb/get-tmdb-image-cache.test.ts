import { getTmdbImageUrl } from '#tmdb/get-tmdb-image-url.js';
import { getTmdbImageCache, type TmdbImageCacheResult } from '#tmdb/get-tmdb-image-cache.js';
import { describe, expect, test } from 'vitest';


describe('tmdb/getTmdbImageCache()', () => {
  test('it provides primary and fallback URLs as available', async () => {
    const cache = getTmdbImageCache();


    // An image that has never been loaded in any resolution should result in
    // a promise without a placeholder URL value.
    let imgResult = cache.getImage('img.png', 'w342');

    expect(imgResult).to.be.a('promise');
    expect((imgResult as TmdbImageCacheResult).placeholderUrl).toEqual(undefined);

    let url = await imgResult;

    expect(url).to.be.a('string').and.equal(getTmdbImageUrl('img.png', 'w342'));


    // A smaller version of an image we already loaded
    // should result in a string of that larger image's URL.
    imgResult = cache.getImage('img.png', 'w180');

    expect(imgResult).to.be.a('string').and.equal(getTmdbImageUrl('img.png', 'w342'));


    // An image that has a smaller version already loaded should result in a promise
    // with a placeholder URL to that smaller image, and resolve with the URL of
    // the larger.
    imgResult = cache.getImage('img.png', 'w780');

    expect(imgResult).to.be.a('promise');
    expect((imgResult as TmdbImageCacheResult).placeholderUrl).toEqual(getTmdbImageUrl('img.png', 'w342'));

    url = await imgResult;

    expect(url).to.be.a('string').and.equal(getTmdbImageUrl('img.png', 'w780'));


    // It'll extract data from a URL path too.
    imgResult = cache.getImage('w342/img.png');

    expect(imgResult).to.be.a('string').and.equal(getTmdbImageUrl('img.png', 'w342'));


    // Errors
    expect(
      () => cache.getImage('foo/img.png'),
    ).to.throw('The resolution of the requested image could not be determined.');

    expect(
      () => cache.getImage(''),
    ).to.throw('A TMDB image ID is required.');

    expect(
      // @ts-expect-error - intentionally passing bad data
      () => cache.getImage(null),
    ).to.throw('A TMDB image ID is required.');
  });
});
