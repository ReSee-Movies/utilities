import { normalizeImageFileDescriptor } from '#images/normalize-image-file-descriptor.js';
import type { DirectusFileDescriptor } from '#resee/get-media-asset-url.js';
import { TmdbFileDescriptor } from '#tmdb/get-tmdb-image-url.js';
import { describe, expect, test } from 'vitest';


describe('images/normalizeImageFileDescriptor()', () => {
  test('it creates a normalized image descriptor from any of several sources', () => {
    const exactString = normalizeImageFileDescriptor('https://noexist.co/img.png');
    const tmdbString  = normalizeImageFileDescriptor('/img.png');
    const descriptor  = normalizeImageFileDescriptor(tmdbString);

    const directusA = normalizeImageFileDescriptor({
      id                : 'resee-img-a.png',
      filename_download : undefined,
    });

    const directusB = normalizeImageFileDescriptor({
      id                : 'resee-img-b.png',
      filename_download : 'Test Image',
      description       : 'Test Description',
      width             : 500,
      height            : 500,
    } as DirectusFileDescriptor);

    const tmdbA = normalizeImageFileDescriptor({
      filename : null,
    } as TmdbFileDescriptor);

    const tmdbB = normalizeImageFileDescriptor({
      filename : '/tmdb-img.png',
      width    : 'w300',
    } as TmdbFileDescriptor);


    expect(exactString).to.have.property('identifier').which.equals('https://noexist.co/img.png');
    expect(exactString).to.have.property('sourceType').which.equals('exact');

    expect(tmdbString).to.have.property('identifier').which.equals('/img.png');
    expect(tmdbString).to.have.property('sourceType').which.equals('tmdb');

    expect(tmdbString).to.have.property('identifier').which.equals('/img.png');

    expect(directusA).to.deep.equal({
      identifier   : 'resee-img-a.png',
      sourceType   : 'resee',
      friendlyName : undefined,
      description  : undefined,
      height       : undefined,
      width        : undefined,
    });

    expect(directusB).to.deep.equal({
      identifier   : 'resee-img-b.png',
      sourceType   : 'resee',
      friendlyName : 'Test Image',
      description  : 'Test Description',
      height       : 500,
      width        : 500,
    });

    expect(tmdbA).to.deep.equal({
      identifier   : undefined,
      sourceType   : 'tmdb',
      friendlyName : undefined,
      description  : undefined,
      height       : undefined,
      width        : undefined,
    });

    expect(tmdbB).to.deep.equal({
      identifier   : '/tmdb-img.png',
      sourceType   : 'tmdb',
      friendlyName : undefined,
      description  : undefined,
      height       : undefined,
      width        : 300,
    });
  });
});
