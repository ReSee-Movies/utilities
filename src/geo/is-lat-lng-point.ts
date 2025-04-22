import { isRef } from 'vue';
import { isObjectLike } from '../objects/is-object-like';


/**
 * The shape of a latitude and longitude pair, which together indicate a single point on
 * the Earth's surface.
 */
export type LatLngPoint = {
  lat : number;
  lng : number;
};


/**
 * Validate that the provided argument is an object with numeric `lat` and `lng` properties.
 */
export function isLatLngPoint(value: unknown): value is LatLngPoint {
  return isObjectLike(value) && !isRef(value) && typeof value.lat === 'number' && typeof value.lng === 'number';
}
