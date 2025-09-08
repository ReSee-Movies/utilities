import { isLatLngPoint } from '@/geo/is-lat-lng-point';
import { describe, expect, test } from 'vitest';


describe('geo/isLatLngPoint()', () => {
  test('it identifies an object containing lat/lng coordinates', () => {
    expect(isLatLngPoint({ lat: 10, lng: 20 })).toEqual(true);
    expect(isLatLngPoint({ lat: 10 })).toEqual(false);
    expect(isLatLngPoint({ lng: 20 })).toEqual(false);
  });
});
