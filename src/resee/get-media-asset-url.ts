import { isObjectLike } from '../objects/is-object-like';
import { isString } from '../strings/is-string';
import { serializeQueryObject } from '../urls/query-serialization';

export type DirectusFileDescriptor = {
  id                 : string;
  filename_download? : string;
  description?       : string;
  height?            : number;
  width?             : number;
};

// See https://docs.directus.io/reference/files.html#custom-transformations
export type AssetTransformConfig = {
  fit?                : 'cover' | 'contain' | 'inside' | 'outside';
  width?              : number;
  height?             : number;
  quality?            : number;
  withoutEnlargement? : boolean;
  format?             : 'auto' | 'jpg' | 'png' | 'webp' | 'tiff';
};

export type ToURLOptions = {
  download? : boolean;
  baseUrl?  : string;
} & AssetTransformConfig;


const DefaultBaseUrl = 'https://api.reseemovies.com/assets/';


/**
 * Generates a URL for fetching media assets from Directus.
 */
export function getMediaAssetUrl(fileId: string, options?: ToURLOptions): string;
export function getMediaAssetUrl(descriptor: DirectusFileDescriptor, options?: ToURLOptions): string;
export function getMediaAssetUrl(fileId: string, friendlyName: string | null | undefined, options?: ToURLOptions): string;

export function getMediaAssetUrl(
  fileIdOrDescriptor: string | DirectusFileDescriptor,
  nameOrOptions?: string | null | ToURLOptions,
  options?: ToURLOptions,
) {
  let path: string = isString(fileIdOrDescriptor) ? fileIdOrDescriptor : fileIdOrDescriptor.id;
  let query: undefined | URLSearchParams = undefined;

  if (isString(nameOrOptions)) {
    path += `/${ nameOrOptions }`;
  }
  else if (isObjectLike(fileIdOrDescriptor) && isString(fileIdOrDescriptor.filename_download)) {
    path += `/${ fileIdOrDescriptor.filename_download }`;
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

  return `${ baseUrl ?? DefaultBaseUrl }${ path }${ queryString }`;
}
