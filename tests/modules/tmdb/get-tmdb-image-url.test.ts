import { getReseeUtilityConstant } from '@/config';
import { getTmdbImageUrl } from '@/tmdb/get-tmdb-image-url';
import { describe, expect, test } from 'vitest';

describe('tmdb/getTmdbImageUrl()', () => {
  test('it will generate a URL to a TMDB image asset', () => {
    const tmdbBase  = getReseeUtilityConstant('tmdbImageBaseUrl');
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
