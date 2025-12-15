import SlugifyFn from '@sindresorhus/slugify';
import { isString } from './is-string';


export type SlugifyValue = string | number | boolean | null | undefined | (string | number | boolean | null | undefined)[];

export type SlugifyOptions = {
  /* Convert camelcase to separate words. Internally it does fooBar → foo bar. */
  decamelize?: boolean;
};


/**
 * Turns a string into a URL-safe slug. Multiple values are concatenated.
 * Uses https://github.com/sindresorhus/slugify under the hood.
 */
export function slugify(value: SlugifyValue, options?: SlugifyOptions) {
  const toSlug = Array.isArray(value) ? value.filter(Boolean).join(' ') : value;

  if (toSlug === null || toSlug === undefined || (isString(toSlug) && toSlug.trim() === '')) {
    return '';
  }

  return SlugifyFn(toSlug.toString(), {
    separator  : '-',
    lowercase  : true,
    decamelize : options?.decamelize ?? false,
  });
}
