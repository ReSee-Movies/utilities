import { getMediaAssetUrl } from '../resee/get-media-asset-url';
import { getTmdbImageUrl } from '../tmdb/get-tmdb-image-url';
import { type ImageFileDescriptor, normalizeImageFileDescriptor } from './normalize-image-file-descriptor';


export type GetImageUrlOptions = {
  reseeBaseUrl? : string;
  tmdbBaseUrl?  : string;
};


/**
 * Creates the URL for an image asset that might come from ReSee, TMDB, or anywhere else.
 */
export function getImageUrl(
  descriptor: ImageFileDescriptor | null | undefined,
  options?: GetImageUrlOptions,
): string {
  const normalized = normalizeImageFileDescriptor(descriptor);

  if (!normalized.identifier) {
    return '';
  }

  if (normalized.sourceType === 'exact') {
    return normalized.identifier;
  }

  if (normalized.sourceType === 'resee') {
    return getMediaAssetUrl(normalized.identifier, normalized.friendlyName, {
      height  : normalized.height,
      width   : normalized.width,
      baseUrl : options?.reseeBaseUrl,
    });
  }

  if (normalized.sourceType === 'tmdb') {
    return getTmdbImageUrl(normalized.identifier, normalized.width, {
      baseUrl: options?.tmdbBaseUrl,
    });
  }

  return '';
}
