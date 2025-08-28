import { getReseeUtilityConstants } from '@/config';
import { fromTmdbImageSize } from '@/tmdb/from-tmdb-image-size';
import { getTmdbImageUrl } from '@/tmdb/get-tmdb-image-url';
import { toTmdbImageSize } from '@/tmdb/to-tmdb-image-size';
import { describe, expect, test } from 'vitest';

describe('fromTmdbImageSize()', () => {
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

describe('toTmdbImageSize()', () => {
  test('it will attempt to convert the provided argument into the string descriptor of an image width for TMDB', () => {
    expect(toTmdbImageSize(123)).to.equal('w123');
    expect(toTmdbImageSize(Number.POSITIVE_INFINITY)).to.equal('original');
    expect(toTmdbImageSize('234')).to.equal('w234');
    expect(toTmdbImageSize('w234')).to.equal('w234');
  });
});

describe('getTmdbImageUrl', () => {
  test('it will generate a URL to a TMDB image asset', () => {
    const tmdbBase  = getReseeUtilityConstants('tmdbImageBaseUrl');
    const filename  = '123.png';
    const width     = 'w342';

    expect(
      getTmdbImageUrl(''),
    ).to.equal('');

    expect(
      getTmdbImageUrl('  '),
    ).to.equal('');

    expect(
      getTmdbImageUrl(filename),
    ).to.equal(`${ tmdbBase }original/${ filename }`);

    expect(
      getTmdbImageUrl(filename, width),
    ).to.equal(`${ tmdbBase }${ width }/${ filename }`);

    expect(
      getTmdbImageUrl(filename, width, { baseUrl: 'https://noexist.co/' }),
    ).to.equal(`https://noexist.co/${ width }/${ filename }`);

    expect(
      getTmdbImageUrl({ filename }),
    ).to.equal(`${ tmdbBase }original/${ filename }`);

    expect(
      getTmdbImageUrl({ filename, width }),
    ).to.equal(`${ tmdbBase }${ width }/${ filename }`);

    expect(
      getTmdbImageUrl({ filename, width }, undefined, { baseUrl: 'https://noexist.co/' }),
    ).to.equal(`https://noexist.co/${ width }/${ filename }`);
  });
});
