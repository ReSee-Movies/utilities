import SlugifyFn from '@sindresorhus/slugify';

/**
 * Turns a string into a URL-safe slug. Multiple values are concatenated.
 */
export function slugify(...values: (string | number | boolean)[]) {
  return SlugifyFn(values.join('-'), {
    separator  : '-',
    lowercase  : true,
    decamelize : false,
  });
}
