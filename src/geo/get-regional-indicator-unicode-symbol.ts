/**
 * Retrieve the regional indicator Unicode sequence for a two character ISO-3166-1
 * region code. In other words... flags, national flags. This derives the Unicode
 * value for a flag based on country code.
 *
 * https://en.wikipedia.org/wiki/Regional_indicator_symbol
 * https://www.bqst.fr/country-code-to-flag-emoji/
 */
export function getRegionalIndicatorUnicodeSymbol(countryCode: string) {
  return String.fromCodePoint(
    ...countryCode.toUpperCase().split('').map((char) => 127397 + char.charCodeAt(0)),
  );
}
