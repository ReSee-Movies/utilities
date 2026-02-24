import { getGoogleMapsQueryUrl } from '@/geo/get-google-maps-url';
import { describe, expect, test } from 'vitest';


describe('geo/getGoogleMapsUrl()', () => {
  test('it creates a URL to Google Maps', () => {
    expect(getGoogleMapsQueryUrl('123 maple ave')).toEqual('https://www.google.com/maps/search/?api=1&query=123%20maple%20ave');
  });
});
