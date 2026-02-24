import { isNumber } from '../numbers/is-number.js';
import { isString } from '../strings/is-string.js';
import { isUUID, UUIDv4Length } from '../strings/is-uuid.js';

const allDigits = new RegExp(/^(\d+)/);

/**
 * Retrieves an ID that has been embedded at the beginning of a URL slug.
 */
export function getIdFromSlug(slug: unknown, type: 'number'): number | undefined;
export function getIdFromSlug(slug: unknown, type: 'uuid' | `first-${ number }`): string | undefined;
export function getIdFromSlug(slug: unknown, type: 'number' | 'uuid' | `first-${ number }`) {
  if (type === 'number') {
    let parsed = Number.NaN;

    if (isNumber(slug)) {
      parsed = slug;
    }
    else if (isString(slug)) {
      parsed = parseInt(allDigits.exec(slug)?.[0] ?? 'NaN');
    }

    return Number.isNaN(parsed) ? undefined : parsed;
  }

  if (type === 'uuid' && isString(slug)) {
    const prefix = slug.substring(0, UUIDv4Length);
    return isUUID(prefix) ? prefix : undefined;
  }

  if (type.startsWith('first-') && isString(slug)) {
    const segmentCount = parseInt(type.substring(6));
    return slug.split('-').slice(0, segmentCount).join('-');
  }

  return undefined;
}
