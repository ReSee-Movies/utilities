import { createSeoMetadata } from '@/seo/create-seo-metadata';
import { describe, expect, test } from 'vitest';


describe('seo/createSeoMetadata()', () => {
  test('it creates a metadata object from the provided argument', () => {
    const testObject = {
      title        : 'The lazy brown Dog',
      altTitle     : 'Die faul brun Hund',
      introduction : 'Tales of a Dog',
      description  : 'Got jumped over it did',
    };

    expect(createSeoMetadata(null)).to.deep.equal({
      title : undefined,
      meta  : [],
    });

    expect(createSeoMetadata(testObject)).to.deep.equal({
      title : 'The lazy brown Dog',
      meta  : [
        { content: 'The lazy brown Dog',     name: 'og:title' },
        { content: 'The lazy brown Dog',     name: 'twitter:title' },
        { content: 'Got jumped over it did', name: 'description' },
        { content: 'Got jumped over it did', name: 'og:description' },
        { content: 'Got jumped over it did', name: 'twitter:description' },
      ],
    });

    expect(
      createSeoMetadata(testObject, {
        titleField : 'altTitle',
        descField  : 'introduction',
      }),
    ).to.deep.equal({
      title : 'Die faul brun Hund',
      meta  : [
        { content: 'Die faul brun Hund', name: 'og:title' },
        { content: 'Die faul brun Hund', name: 'twitter:title' },
        { content: 'Tales of a Dog',     name: 'description' },
        { content: 'Tales of a Dog',     name: 'og:description' },
        { content: 'Tales of a Dog',     name: 'twitter:description' },
      ],
    });

    expect(
      createSeoMetadata(testObject, {
        titleField: ['title', 'altTitle'],
      }),
    ).to.deep.equal({
      title : 'The lazy brown Dog Die faul brun Hund',
      meta  : [
        { content: 'The lazy brown Dog Die faul brun Hund', name: 'og:title' },
        { content: 'The lazy brown Dog Die faul brun Hund', name: 'twitter:title' },
        { content: 'Got jumped over it did',                name: 'description' },
        { content: 'Got jumped over it did',                name: 'og:description' },
        { content: 'Got jumped over it did',                name: 'twitter:description' },
      ],
    });

    expect(
      createSeoMetadata(testObject, {
        title : 'A Custom Title',
        desc  : 'A Custom Description',
      }),
    ).to.deep.equal({
      title : 'A Custom Title',
      meta  : [
        { content: 'A Custom Title',       name: 'og:title' },
        { content: 'A Custom Title',       name: 'twitter:title' },
        { content: 'A Custom Description', name: 'description' },
        { content: 'A Custom Description', name: 'og:description' },
        { content: 'A Custom Description', name: 'twitter:description' },
      ],
    });

    expect(
      createSeoMetadata(testObject, {
        imagePath : 'https://noexist.co/img.png',
        jsonLD    : { '@type': 'Organization' },
      }),
    ).to.deep.equal({
      title : 'The lazy brown Dog',
      meta  : [
        { content: 'The lazy brown Dog',         name: 'og:title' },
        { content: 'The lazy brown Dog',         name: 'twitter:title' },
        { content: 'Got jumped over it did',     name: 'description' },
        { content: 'Got jumped over it did',     name: 'og:description' },
        { content: 'Got jumped over it did',     name: 'twitter:description' },
        { content: 'https://noexist.co/img.png', name: 'og:image'},
        { content: 'https://noexist.co/img.png', name: 'twitter:image' },
      ],
      script: [
        { innerHTML: '{"@type":"Organization"}', type: 'application/ld+json' }
      ],
    });

    expect(createSeoMetadata(testObject, { jsonLD: '{ "@type": "Organization" }' }))
      .to.haveOwnProperty('script')
      .which.is.an('array')
      .and.has.lengthOf(1);
  });
});
