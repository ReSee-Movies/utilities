import { isString } from '@resee-movies/utils/strings/is-string';
import { ImageFileDescriptor } from '../images/normalize-image-file-descriptor';
import { getImageUrl } from '../images/get-image-url';


export type CreateSeoMetadataOptions = {
  imagePath?  : ImageFileDescriptor;
  titleField? : string | string[];
  descField?  : string;
  jsonLD?     : string | object;
};


export type CreateSeoMetadataReturn = {
  title   : string | undefined;
  meta    : { name: string; content: string }[];
  script? : { type: 'application/ld+json'; innerHTML: string }[];
};


/**
 * Generates an object which can be used to create SEO metadata about the
 * provided argument.
 */
export function createSeoMetadata(
  record: Record<string, unknown> | null | undefined,
  config: CreateSeoMetadataOptions = {},
): CreateSeoMetadataReturn {
  const result: CreateSeoMetadataReturn = { title: undefined, meta: [] };

  if (!record) {
    return result;
  }

  const titleField = config.titleField ?? 'title';

  const title = Array.isArray(titleField)
    ? titleField.map((key) => record[key]).join(' ')
    : record[titleField];

  const desc = record[config.descField ?? 'description'];

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
