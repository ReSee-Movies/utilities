import { toInteger } from '../numbers/to-integer';


/**
 * Given a string or number amount of minutes, this method will return a string
 * with the format "<hours>h <minutes>m".
 */
export function toFormattedHoursMinutes(minutes: unknown) {
  const total = toInteger(minutes);

  if (!isNaN(total)) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;

    return hours === 0 ? `${ minutes }m` : `${ hours }h ${ minutes }m`;
  }

  return undefined;
}
