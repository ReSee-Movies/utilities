import { isObjectLike } from '#objects/is-object-like.js';
import type { DirectusFileDescriptor } from '#resee/get-media-asset-url.js';
import { isString } from '#strings/is-string.js';
import { fromTmdbImageSize } from '#tmdb/from-tmdb-image-size.js';
import type { TmdbFileDescriptor } from '#tmdb/get-tmdb-image-url.js';
import { isUrl } from '#urls/is-url.js';


export type ImageFileDescriptor
  = NormalizedFileDescriptor
    | DirectusFileDescriptor
    | TmdbFileDescriptor
    | string;

export type NormalizedFileDescriptorSource = 'exact' | 'resee' | 'tmdb';

export type NormalizedFileDescriptor = {
  identifier   : string | undefined;
  description  : string | undefined;
  friendlyName : string | undefined;
  sourceType   : NormalizedFileDescriptorSource;
  height       : number | undefined;
  width        : number | undefined;
};


/**
 * Normalizes image information from the various forms that it can take within
 * ReSee applications into a single format that describes everything needed to
 * stitch a URL together for the asset.
 */
export function normalizeImageFileDescriptor(
  descriptor: ImageFileDescriptor | null | undefined,
): NormalizedFileDescriptor {
  const result: NormalizedFileDescriptor = {
    identifier   : undefined,
    description  : undefined,
    friendlyName : undefined,
    sourceType   : 'exact',
    height       : undefined,
    width        : undefined,
  };

  if (isString(descriptor)) {
    result.identifier = descriptor;
    result.sourceType = isUrl(descriptor) ? 'exact' : 'tmdb';
  }
  else if (isObjectLike(descriptor)) {
    if ('identifier' in descriptor) {
      return descriptor;
    }
    else if ('filename_download' in descriptor) {
      result.identifier   = descriptor.id;
      result.description  = descriptor.description ?? undefined;
      result.friendlyName = descriptor.filename_download ?? undefined;
      result.sourceType   = 'resee';
      result.height       = descriptor.height ?? undefined;
      result.width        = descriptor.width ?? undefined;
    }
    else if ('filename' in descriptor) {
      result.identifier = descriptor.filename ?? undefined;
      result.sourceType = 'tmdb';
      result.width      = fromTmdbImageSize(descriptor.width);
    }
  }

  return result;
}
