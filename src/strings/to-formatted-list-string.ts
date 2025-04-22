export type ToFormattedListStringOptions = {
  prefix?            : string;
  suffix?            : string;
  separator?         : string;
  lastItemSeparator? : string;
};


/**
 * An extra-fancy version of `Array.join()` that provides a way to wrap array entries
 * in additional content, and differentiate the "last item" separator. The original
 * goal of this method was to simplify taking an array of items and turning them into
 * a plain-language string.
 *
 * ```ts
 * const shoppingList = ['apples', 'bread', 'sugar', 'tofu'];
 *
 * toFormattedListString(shoppingList);
 * // => "apples, bread, sugar and tofu"
 * ```
 */
export function toFormattedListString(
  contents: (string | null | undefined)[],
  options?: ToFormattedListStringOptions,
) {
  const opts = {
    prefix            : '',
    suffix            : '',
    separator         : ', ',
    lastItemSeparator : ' and ',

    ...options,
  };

  const stringContents = contents
    .filter(Boolean)
    .map((entry) => opts.prefix + entry + opts.suffix);

  if (stringContents.length < 2) {
    return stringContents.join('');
  }

  return stringContents.slice(0, -1).join(opts.separator) + opts.lastItemSeparator + stringContents.at(-1);
}
