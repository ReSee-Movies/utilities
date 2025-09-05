import { getReseeUtilityConstant } from '../config';
import { isObjectLike } from '../objects/is-object-like';
import { isString } from '../strings/is-string';
import type { UrlQuerySerializableObject } from '../typings/url-query-serialization';
import { serializeToSearchParams } from '../urls/serialize-to-search-params';

/**
 * The basic shape of an "Asset" record provided by the Directus CMS. This
 * is not exhaustive of all properties, but specifically the ones that are
 * useful for images.
 */
export type DirectusFileDescriptor = {
  id                 : string;
  filename_download? : string | null;
  description?       : string | null;
  height?            : number | null;
  width?             : number | null;
};

/**
 * Config that can be provided to the Directus CMS for manipulating image
 * assets.
 *
 * @see https://docs.directus.io/reference/files.html#custom-transformations
 */
export type MediaAssetTransformConfig = {
  fit?                : 'cover' | 'contain' | 'inside' | 'outside';
  width?              : number;
  height?             : number;
  quality?            : number;
  withoutEnlargement? : boolean;
  format?             : 'auto' | 'jpg' | 'png' | 'webp' | 'tiff';
};

/**
 * Config options for the {@link getMediaAssetUrl} utility.
 */
export type GetMediaAssetUrlOptions = {
  download? : boolean;
  baseUrl?  : string;
} & MediaAssetTransformConfig;


/**
 * Generates a URL for fetching media assets from Directus.
 */
export function getMediaAssetUrl(fileId: string, options?: GetMediaAssetUrlOptions): string;
export function getMediaAssetUrl(descriptor: DirectusFileDescriptor, options?: GetMediaAssetUrlOptions): string;
export function getMediaAssetUrl(fileId: string, friendlyName: string | null | undefined, options?: GetMediaAssetUrlOptions): string;

export function getMediaAssetUrl(
  fileIdOrDescriptor: string | DirectusFileDescriptor,
  nameOrOptions?: string | null | GetMediaAssetUrlOptions,
  options?: GetMediaAssetUrlOptions,
): string {
  let path      = isString(fileIdOrDescriptor) ? fileIdOrDescriptor : fileIdOrDescriptor.id;
  let queryOpts = undefined as undefined | UrlQuerySerializableObject;
  let query     = undefined as undefined | URLSearchParams;
  let baseUrl   = undefined as undefined | string;


  if (!isString(path, { withContent: true })) {
    return '';
  }

  if (isString(nameOrOptions)) {
    path += `/${ encodeURIComponent(nameOrOptions) }`;
  }
  else if (isObjectLike(fileIdOrDescriptor) && isString(fileIdOrDescriptor.filename_download)) {
    path += `/${ encodeURIComponent(fileIdOrDescriptor.filename_download) }`;
  }

  if (isObjectLike(nameOrOptions)) {
    ({ baseUrl, ...queryOpts } = nameOrOptions);
  }
  else if (isObjectLike(options)) {
    ({ baseUrl, ...queryOpts } = options);
  }

  if (queryOpts) {
    query = serializeToSearchParams(queryOpts);
  }

  return [
    baseUrl ?? getReseeUtilityConstant('reseeImageBaseUrl'),
    path,
    (query ? `?${ query.toString() }` : ''),
  ].join('');
}
