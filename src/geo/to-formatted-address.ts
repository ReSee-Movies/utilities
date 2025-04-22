import { formatAddress, type Address } from 'localized-address-format';
import { intersection } from '../collections/intersection';

export type AddressFormat0 = Address;

export type AddressFormat1 = {
  name?             : null | string;
  organization?     : null | string;
  street_address?   : null | string;
  address_locality? : null | string;
  address_region?   : null | string;
  address_country?  : null | string;
  postal_code?      : null | string;
};

export type AddressFormat = AddressFormat0 | AddressFormat1;

export type ToFormattedAddressOptions = {
  includeName?   : boolean;
  nameSeparator? : string;
};

/**
 * Format an address object to a string, taking into account the
 * addresses' locality.
 */
export function toFormattedAddress(parts: AddressFormat, options?: ToFormattedAddressOptions) {
  const normalized  = normalizeAddressParts(parts);
  const addressName = normalized.name;

  normalized.name = undefined;

  const result = formatAddress(normalized);

  if (options?.includeName !== false && addressName) {
    return `${ addressName }${ options?.nameSeparator ?? ', ' }\n${ result.join('\n') }`;
  }

  return result.join('\n');
}

/**
 * Type guard that identifies the provided object as containing the
 * properties of the AddressFormat0 type.
 */
export function isAddressFormat0(parts: AddressFormat): parts is AddressFormat0 {
  return intersection(
    Object.keys(parts),
    [
      'addressLines',
      'locality',
      'administrativeArea',
      'postalCountry',
      'postalCode',
    ],
  ).length > 0;
}

/**
 * Type guard that identifies the provided object as containing the
 * properties of the AddressFormat1 type.
 */
export function isAddressFormat1(parts: AddressFormat): parts is AddressFormat1 {
  return intersection(
    Object.keys(parts),
    [
      'street_address',
      'address_locality',
      'address_region',
      'address_country',
      'postal_code',
    ],
  ).length > 0;
}

/**
 * Takes in any type of supported address object, and returns an object
 * of the AddressFormat0 type.
 */
export function normalizeAddressParts(parts: AddressFormat): AddressFormat0 {
  const normalized: Address = {
    name         : parts.name ?? undefined,
    organization : parts.organization ?? undefined,
  };

  if (isAddressFormat0(parts)) {
    Object.assign(normalized, parts);
  }
  else if (isAddressFormat1(parts)) {
    normalized.addressLines       = parts.street_address ? [parts.street_address] : undefined;
    normalized.locality           = parts.address_locality ?? undefined;
    normalized.administrativeArea = parts.address_region ?? undefined;
    normalized.postalCountry      = parts.address_country ?? undefined;
    normalized.postalCode         = parts.postal_code ?? undefined;
  }

  return normalized;
}
