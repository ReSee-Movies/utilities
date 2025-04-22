import { toTitleCase } from './to-title-case';

const HumanizeStringRegex = /(?<!^)(?:[-_]|((?<![-_])[A-Z](?=[a-z]))|((?<=[a-z])[A-Z]))/g;

/**
 * Splits a string on hyphens, underscores, and uppercase characters, with
 * some extra care given to characters runs that look like they might be an
 * acronym. This is particularly suited to turning variable names into
 * human-friendly strings.
 *
 * ```ts
 * humanize('firstName');   // > "First Name"
 * humanize('first-name');  // > "First Name"
 * humanize('first_name');  // > "First Name"
 * humanize('someURLProp'); // > "Some URL Prop"
 * ```
 */
export function humanize(value: string) {
  return toTitleCase(
    value.replace(HumanizeStringRegex, (_match, p1, p2) => {
      return ` ${ p1 || p2 || '' }`;
    }),
    false,
  );
}
