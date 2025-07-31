/**
 * Generates a 14 character hash for any string value. It's simple, fast. and very insecure (so
 * please don't go hashing passwords). Loosely based on MurmurHash2/3, and an improvement over
 * {@link toSimpleHash}
 *
 * @see https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
 */
export function toCyrb64Hash(value: string, seed = 0) {
  const [h2, h1] = cyrb64(value, seed);
  return (h2.toString(36).padStart(7, '0')) + (h1.toString(36).padStart(7, '0'));
}


// cyrb53 (c) 2018 bryc (github.com/bryc). License: Public domain. Attribution appreciated.
// A fast and simple 64-bit (or 53-bit) string hash function with decent collision resistance.
// Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
// See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
// https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
function cyrb64(value: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for(let i = 0, ch; i < value.length; i += 1) {
    ch = value.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  // For a single 53-bit numeric return value we could return
  // 4294967296 * (2097151 & h2) + (h1 >>> 0);
  // but we instead return the full 64-bit value:
  return [h2 >>> 0, h1 >>> 0];
}
