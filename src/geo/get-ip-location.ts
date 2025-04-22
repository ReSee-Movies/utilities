import type { LatLngPoint } from './is-lat-lng-point';


/**
 * Attempts to use an IP address to acquire lat / lng coordinates.
 */
export async function getIPLocation(): Promise<undefined | LatLngPoint> {
  const resp = await fetch('http://ip-api.com/json?fields=status,message,lat,lon', { method: 'GET' });

  const result = await resp.json() as {
    lat     : number;
    lon     : number;
    status  : 'success' | 'fail';
    message : string;
  };

  if (result.status === 'fail') {
    return undefined;
  }

  return { lat: result.lat, lng: result.lon };
}
