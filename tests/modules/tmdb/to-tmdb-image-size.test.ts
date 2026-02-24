import { toTmdbImageSize } from '@/tmdb/to-tmdb-image-size';
import { describe, expect, test } from 'vitest';

describe('tmdb/toTmdbImageSize()', () => {
  test('it will attempt to convert the provided argument into the string descriptor of an image width for TMDB', () => {
    expect(toTmdbImageSize(123)).to.equal('w123');
    expect(toTmdbImageSize(Number.POSITIVE_INFINITY)).to.equal('original');
    expect(toTmdbImageSize('234')).to.equal('w234');
    expect(toTmdbImageSize('w234')).to.equal('w234');
  });
});
