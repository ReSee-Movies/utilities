import SlugifyFn, { type Options } from '@sindresorhus/slugify';

const DefaultOptions: Options = {
  separator  : '-',
  lowercase  : true,
  decamelize : false,
};

/**
 * Turns a string into a URL-safe slug.
 */
export function slugify(value: string, options: Options = DefaultOptions) {
  return SlugifyFn(value, options);
}
