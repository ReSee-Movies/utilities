import { generateTrigram } from './generate-trigram.js';
import { isString } from './is-string.js';


/**
 * Returns a number between 0 and 1 indicating the similarity of two trigrams.
 *
 * Both arrays and strings can be provided as arguments. Arrays are assumed to
 * be already-generated trigrams, and string will have their trigrams generated.
 */
export function getTrigramSimilarity(input1: string | string[], input2: string | string[]): number {
  if (isString(input1) && isString(input2) && input1.trim() && input1 === input2) {
    return 1;
  }

  const gramA = new Set(Array.isArray(input1) ? input1 : generateTrigram(input1));
  const gramB = new Set(Array.isArray(input2) ? input2 : generateTrigram(input2));

  const total = gramA.union(gramB);

  if (total.size === 0) {
    return 0;
  }

  return gramA.intersection(gramB).size / total.size;
}
