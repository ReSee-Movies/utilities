import { fromTmdbImageSize } from '#tmdb/from-tmdb-image-size.js';
import { describe, expect, test } from 'vitest';

describe('tmdb/fromTmdbImageSize()', () => {
  test('it will attempt to convert the provided argument into an integer description of an image width', () => {
    expect(fromTmdbImageSize(1234)).to.equal(1234);
    expect(fromTmdbImageSize('123')).to.equal(123);
    expect(fromTmdbImageSize('w234')).to.equal(234);
    expect(fromTmdbImageSize('original')).to.equal(Number.POSITIVE_INFINITY);
    expect(fromTmdbImageSize('original', { originalIsUndefined: true })).to.equal(undefined);
    expect(fromTmdbImageSize('foobar')).to.equal(undefined);
    expect(fromTmdbImageSize('woobar')).to.equal(undefined);
  });
});
