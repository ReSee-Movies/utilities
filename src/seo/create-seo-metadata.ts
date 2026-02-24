import { isString } from '../strings/is-string.js';
import type { ImageFileDescriptor } from '../images/normalize-image-file-descriptor.js';
import { getImageUrl, type GetImageUrlOptions } from '../images/get-image-url.js';


/**
 * Config options for the {@link createSeoMetadata} method.
 */
export type CreateSeoMetadataOptions = {
  imagePath?    : ImageFileDescriptor;
  imageOptions? : GetImageUrlOptions;
  titleField?   : string | string[];
  title?        : string;
  descField?    : string;
  desc?         : string;
  jsonLD?       : string | object;
};


/**
 * The object returned by the {@link createSeoMetadata} method;
 * compatible with Unhead's `useHead` utility.
 *
 * @see https://unhead.unjs.io/
 */
export type CreateSeoMetadataReturn = {
  title   : string | undefined;
  meta    : { name: string; content: string }[];
  script? : { type: 'application/ld+json'; innerHTML: string }[];
};


/**
 * Extracts information from the argument object that can be useful for
 * SEO metadata.
 */
export function createSeoMetadata(
  record: Record<string, unknown> | null | undefined,
  config: CreateSeoMetadataOptions = {},
): CreateSeoMetadataReturn {
  const result: CreateSeoMetadataReturn = { title: undefined, meta: [] };

  if (!record) {
    return result;
  }

  let title: string | undefined;
  let desc: string | undefined;

  if (config.title) {
    title = config.title;
  }
  else {
    const titleField = config.titleField ?? 'title';

    if (Array.isArray(titleField)) {
      title = titleField.map((key) => record[key]).join(' ');
    }
    else if (record[titleField]) {
      title = String(record[titleField]);
    }
  }

  if (config.desc) {
    desc = config.desc;
  }
  else {
    const descValue = record[config.descField ?? 'description'];
    desc = descValue ? String(descValue) : undefined;
  }

  if (isString(title, { withContent: true })) {
    result.title = title;

    result.meta.push(
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },
    );
  }

  if (isString(desc, { withContent: true })) {
    result.meta.push(
      { name: 'description', content: desc },
      { name: 'og:description', content: desc },
      { name: 'twitter:description', content: desc },
    );
  }

  if (config.imagePath) {
    const imageUrl = getImageUrl(config.imagePath, config.imageOptions);

    if (imageUrl) {
      result.meta.push(
        { name: 'og:image', content: imageUrl },
        { name: 'twitter:image', content: imageUrl },
      );
    }
  }

  if (config.jsonLD) {
    result.script = [{
      type      : 'application/ld+json',
      innerHTML : isString(config.jsonLD) ? config.jsonLD : JSON.stringify(config.jsonLD),
    }];
  }

  return result;
}
