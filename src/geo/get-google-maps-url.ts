import { isObjectLike } from '../objects/is-object-like';
import { isString } from '../strings/is-string';
import { toFormattedAddress, type AddressFormat } from './to-formatted-address';

/**
 * Create a URL to Google Maps for a particular query term.
 */
export function getGoogleMapsQueryUrl(
  query: string | string[] | AddressFormat,
  basePath: string = 'https://www.google.com/maps/search/?api=1',
) {
  let queryString = '';

  if (Array.isArray(query)) {
    queryString = query.join(' ');
  }
  else if (isObjectLike(query)) {
    queryString = toFormattedAddress(query);
  }
  else if (isString(query)) {
    queryString = query;
  }

  return `${ basePath }&query=${ encodeURIComponent(queryString) }`;
}
