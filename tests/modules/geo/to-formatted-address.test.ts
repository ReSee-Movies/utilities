import { toFormattedAddress, type AddressFormat2, AddressFormat1 } from '#geo/to-formatted-address.js';
import { describe, expect, test } from 'vitest';


describe('geo/toFormattedAddress()', () => {
  const testAddress1: AddressFormat1 = {
    street_address: '35 Lehrter Straße',
    address_locality: 'Berlin',
    address_region: 'Berlin',
    address_country: 'DE',
    postal_code: '10557',
  };

  const testAddress2: AddressFormat2 = {
    street_number : '35',
    route         : 'Lehrter Straße',
    sublocality   : 'Mitte',
    locality      : 'Berlin',
    country       : 'DE',
    postal_code   : '10557',
  };

  const expectedResult = '35 Lehrter Straße\n10557 Berlin';

  test('it standardizes the format of an address from a variety of sources', () => {
    expect(toFormattedAddress(testAddress1)).toEqual(expectedResult);
    expect(toFormattedAddress(testAddress2)).toEqual(expectedResult);
  });
});
