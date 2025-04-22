import { ensureLeadingSlash } from '../urls/ensure-leading-slash';


export const TmdbPosterSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const;
export type TmdbPosterSize = typeof TmdbPosterSizes[number];

export const TmdbBackdropSizes = ['w300', 'w780', 'w1280', 'original'];
export type TmdbBackdropSize = typeof TmdbBackdropSizes[number];

export const TmdbLogoSizes = ['w45', 'w92', 'w154', 'w185', 'w342', 'w500', 'original'] as const;
export type TmdbLogoSize = typeof TmdbLogoSizes[number];

export const TmdbProfileSizes = ['w45', 'w185', 'w342', 'original'] as const;
export type TmdbProfileSize = typeof TmdbProfileSizes[number];


const DefaultBaseUrl = 'https://image.tmdb.org/t/p/';

/**
 * Given only the ID, return a full URL to an image file from TMDB.
 */
export function getTmdbImageUrl(
  file: string | null | undefined,
  size: TmdbPosterSize | TmdbBackdropSize | TmdbLogoSize | TmdbProfileSize = 'original',
  opt?: { baseUrl?: string },
) {
  return !file || file.trim() === ''
    ? ''
    : `${ opt?.baseUrl ?? DefaultBaseUrl }${ size }${ ensureLeadingSlash(file) }`;
}
