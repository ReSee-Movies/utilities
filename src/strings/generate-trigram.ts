import { trigram } from '@drorgl/n-gram';


function convertString(input = ''): string {
  if (!input || !input.trim()) {
    return '';
  }

  return `  ${input
    .trim()
    .replace(/\s+/g, ' ') // replace multiple spaces w/ single spaces
    .replace(/\s/g, '  ')} ` // replace single spaces w/ double spaces
    .toLowerCase();
}


/**
 * Creates an array of trigrams from the provided string argument.
 */
export function generateTrigram(input = ''): string[] {
  const tg = trigram(convertString(input))
    .flat()
    .filter((item) => !/^[\p{Letter}\p{Mark}0-9]\s\s$/giu.test(item))

  return Array.from(new Set(tg));
}





