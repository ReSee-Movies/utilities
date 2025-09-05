import { getReseeUtilityConstant } from '../config';
import { isObjectLike } from '../objects/is-object-like';
import { isString } from '../strings/is-string';
import { serializeQueryObject } from '../urls/query-serialization';

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
  let path: string = isString(fileIdOrDescriptor) ? fileIdOrDescriptor : fileIdOrDescriptor.id;
  let query: undefined | URLSearchParams = undefined;

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
    query = new URLSearchParams(serializeQueryObject(nameOrOptions, { removeUndefined: true }));
  }
  else if (isObjectLike(options)) {
    query = new URLSearchParams(serializeQueryObject(options, { removeUndefined: true }));
  }

  const baseUrl = query?.get('baseUrl');
  query?.delete('baseUrl');

  const queryString = query ? `?${ query.toString() }` : '';

  return `${ baseUrl ?? getReseeUtilityConstant('reseeImageBaseUrl') }${ path }${ queryString }`;
}
