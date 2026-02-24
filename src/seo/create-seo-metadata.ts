import { isString } from '../strings/is-string.js';
import type { ImageFileDescriptor } from '../images/normalize-image-file-descriptor.js';
import { getImageUrl } from '../images/get-image-url.js';


/**
 * Config options for the {@link createSeoMetadata} method.
 */
export type CreateSeoMetadataOptions = {
  imagePath?  : ImageFileDescriptor;
  titleField? : string | string[];
  title?      : string;
  descField?  : string;
  desc?       : string;
  jsonLD?     : string | object;
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

    title = Array.isArray(titleField)
      ? titleField.map((key) => record[key]).join(' ')
      : String(record[titleField]);
  }

  if (config.desc) {
    desc = config.desc;
  }
  else {
    desc = String(record[config.descField ?? 'description']);
  }

  if (isString(title) && title.length) {
    result.title = title;

    result.meta.push(
      { name: 'og:title', content: title },
      { name: 'twitter:title', content: title },
    );
  }

  if (isString(desc) && desc.length) {
    result.meta.push(
      { name: 'description', content: desc },
      { name: 'og:description', content: desc },
      { name: 'twitter:description', content: desc },
    );
  }

  if (config.imagePath) {
    const imageUrl = getImageUrl(config.imagePath);

    result.meta.push(
      { name: 'og:image', content: imageUrl },
      { name: 'twitter:image', content: imageUrl },
    );
  }

  if (config.jsonLD) {
    result.script = [{
      type      : 'application/ld+json',
      innerHTML : isString(config.jsonLD) ? config.jsonLD : JSON.stringify(config.jsonLD),
    }];
  }

  return result;
}
