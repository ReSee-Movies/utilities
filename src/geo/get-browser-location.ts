import type { LatLngPoint } from './is-lat-lng-point';


/**
 * Attempts to use the browser's Geolocation API to acquire lat / lng coordinates.
 */
export async function getBrowserLocation(): Promise<undefined | LatLngPoint> {
  if (!navigator.geolocation) {
    return undefined;
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (exception) => reject(exception),
    );
  });
}
