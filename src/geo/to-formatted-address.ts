import { formatAddress, type Address } from 'localized-address-format';

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

export type AddressFormat2 = {
  name?          : null | string;
  organization?  : null | string;
  street_number? : null | string;
  route?         : null | string;
  sublocality?   : null | string;
  locality?      : null | string;
  country?       : null | string;
  postal_code?   : null | string;
}

export type AddressFormat = AddressFormat0 | AddressFormat1 | AddressFormat2;

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
 * properties of the {@link AddressFormat0} type.
 */
export function isAddressFormat0(parts: AddressFormat): parts is AddressFormat0 {
  return 'addressLines' in parts;
}

/**
 * Type guard that identifies the provided object as containing the
 * properties of the {@link AddressFormat1} type.
 */
export function isAddressFormat1(parts: AddressFormat): parts is AddressFormat1 {
  return 'street_address' in parts;
}

/**
 * Type guard that identifies the provided object as containing the
 * properties of the {@link AddressFormat2} type.
 */
export function isAddressFormat2(parts: AddressFormat): parts is AddressFormat2 {
  return 'route' in parts;
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
  else if (isAddressFormat2(parts)) {
    const streetAddress = [parts.street_number, parts.route].filter(Boolean).join(' ').trim();

    normalized.addressLines  = streetAddress ? [streetAddress] : undefined;
    normalized.locality      = parts.locality ?? undefined;
    normalized.postalCountry = parts.country ?? undefined;
    normalized.postalCode    = parts.postal_code ?? undefined;
  }

  return normalized;
}
