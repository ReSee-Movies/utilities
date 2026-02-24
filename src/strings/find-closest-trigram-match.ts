import { toStableHash } from '#objects/to-stable-hash.js';
import { generateTrigram } from './generate-trigram.js';
import { getTrigramSimilarity } from './get-trigram-similarity.js';


/**
 * An object with a `trigram` property which contains a string array.
 */
export type TrigramObject = { trigram: string[]; };

/**
 * The return type of calling {@link findClosestTrigramMatch}, containing
 * the best fit candidate, and the similarity value.
 */
export type TrigramMatch<T extends TrigramObject> = {
  similarity : number;
  candidate  : T;
};


const closestMatchCache = new Map<string, TrigramMatch<TrigramObject>>();


/**
 * Finds the closest trigram match from an array of candidate values.
 */
export function findClosestTrigramMatch<
  T extends TrigramObject,
>(source: string | string[], candidates: T[]): TrigramMatch<T> | null {
  const cacheKey = toStableHash(source);

  if (closestMatchCache.has(cacheKey)) {
    return closestMatchCache.get(cacheKey) as TrigramMatch<T>;
  }

  const sourceTrigram = Array.isArray(source) ? source : generateTrigram(source);

  let similarity = 0;
  let candidate  = undefined as undefined | T;

  for (const entry of candidates) {
    const testFit = getTrigramSimilarity(sourceTrigram, entry.trigram);

    if (testFit > similarity) {
      similarity = testFit;
      candidate  = entry;

      if (testFit === 1) {
        break;
      }
    }
  }

  if (candidate) {
    closestMatchCache.set(cacheKey, { similarity, candidate });
  }

  return (closestMatchCache.get(cacheKey) as TrigramMatch<T> || undefined) ?? null;
}
