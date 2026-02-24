import { isObjectLike } from '#objects/is-object-like.js';
import { ensureLeadingSlash } from '#urls/ensure-leading-slash.js';
import { toTmdbImageSize } from './to-tmdb-image-size.js';


/**
 * The size values of movie promotional posters that TMDB officially supports.
 */
export const TmdbPosterSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const;

/**
 * The size of movie promotional posters that TMDB officially supports.
 */
export type TmdbPosterSize = typeof TmdbPosterSizes[number];

/**
 * The size values of movie background imagery that TMDB officially supports.
 */
export const TmdbBackdropSizes = ['w300', 'w780', 'w1280', 'original'] as const;

/**
 * The size of movie background imagery that TMDB officially supports.
 */
export type TmdbBackdropSize = typeof TmdbBackdropSizes[number];

/**
 * The size values of production company / streaming provider / etc. "logos"
 * that TMDB officially supports.
 */
export const TmdbLogoSizes = ['w45', 'w92', 'w154', 'w185', 'w342', 'w500', 'original'] as const;

/**
 * The size of production company / streaming provider / etc. "logos"
 * that TMDB officially supports.
 */
export type TmdbLogoSize = typeof TmdbLogoSizes[number];

/**
 * The size values of cast/crew headshot images that TMDB officially supports.
 */
export const TmdbProfileSizes = ['w45', 'w185', 'w342', 'original'] as const;

/**
 * The size of cast/crew headshot images that TMDB officially supports.
 */
export type TmdbProfileSize = typeof TmdbProfileSizes[number];

/**
 * A union of possible TMDB image sizes. Note that not all sizes work with all image types.
 */
export type TmdbImageSize = TmdbPosterSize | TmdbBackdropSize | TmdbLogoSize | TmdbProfileSize | string | number;

/**
 * The default value of {@link GetTmdbImageUrlOptions.baseUrl}.
 */
export const DefaultBaseUrl = 'https://image.tmdb.org/t/p/';

/**
 * Config options for the {@link getTmdbImageUrl} utility method.
 */
export type GetTmdbImageUrlOptions = {
  baseUrl?: string;
};

/**
 * A TmdbFileDescriptor is an alternative way to provide image file + size
 * information in one object.
 */
export type TmdbFileDescriptor = {
  filename : string | null | undefined;
  width?   : TmdbImageSize;
};


/**
 * Given only the ID, return a full URL to an image file from TMDB.
 */
export function getTmdbImageUrl(
  file: TmdbFileDescriptor | string | null | undefined,
  size?: TmdbImageSize,
  opts?: GetTmdbImageUrlOptions,
): string {
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
    + toTmdbImageSize(fileSize)
    + ensureLeadingSlash(fileName);
}
