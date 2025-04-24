import { isNumber } from '../numbers/is-number';
import { isObjectLike } from '../objects/is-object-like';
import { ensureLeadingSlash } from '../urls/ensure-leading-slash';


export const TmdbPosterSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const;
export type TmdbPosterSize = typeof TmdbPosterSizes[number];

export const TmdbBackdropSizes = ['w300', 'w780', 'w1280', 'original'];
export type TmdbBackdropSize = typeof TmdbBackdropSizes[number];

export const TmdbLogoSizes = ['w45', 'w92', 'w154', 'w185', 'w342', 'w500', 'original'] as const;
export type TmdbLogoSize = typeof TmdbLogoSizes[number];

export const TmdbProfileSizes = ['w45', 'w185', 'w342', 'original'] as const;
export type TmdbProfileSize = typeof TmdbProfileSizes[number];

export type TmdbImageSize
  = TmdbPosterSize
    | TmdbBackdropSize
    | TmdbLogoSize
    | TmdbProfileSize
    | number;

export type GetTmdbImageUrlOptions = {
  baseUrl?: string;
};

export type TmdbFileDescriptor = {
  filename : string | null | undefined;
  width?   : TmdbImageSize;
};

const DefaultBaseUrl = 'https://image.tmdb.org/t/p/';


/**
 * Given only the ID, return a full URL to an image file from TMDB.
 */
export function getTmdbImageUrl(
  file: TmdbFileDescriptor | string | null | undefined,
  size?: TmdbImageSize,
  opts?: GetTmdbImageUrlOptions,
) {
  if (!file) {
    return '';
  }

  let fileName: string | null | undefined;
  let fileSize: string | number | undefined = undefined;

  if (isObjectLike(file)) {
    fileName = file.filename;
    fileSize = file.width;
  }
  else {
    fileName = file;
  }

  if (!fileName || fileName.trim() === '') {
    return '';
  }

  fileSize = size ?? fileSize ?? 'original';

  return (opts?.baseUrl ?? DefaultBaseUrl)
    + (isNumber(fileSize) ? `w${ fileSize }` : fileSize)
    + ensureLeadingSlash(fileName);
}
