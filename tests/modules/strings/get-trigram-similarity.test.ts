import { getTrigramSimilarity } from '#strings/get-trigram-similarity.js';
import { describe, expect, test } from 'vitest';

describe('strings/generateTrigram()', () => {
  test('it compares the trigrams of two strings', () => {
    const testString     = 'Hello World';
    const testTrigram    = ['ld ', 'rld', 'orl', 'wor', ' wo', '  w', 'lo ', 'llo', 'ell', 'hel', ' he', '  h'];
    const compareString  = 'Hello Mars';
    const compareTrigram = ['rs ', 'ars', 'mar', ' ma', '  m', 'lo ', 'llo', 'ell', 'hel', ' he', '  h'];

    const expected  = 0.3529;
    const precision = 4;

    // Exactly the same
    [
      [testString,  testString],
      [testString,  testTrigram],
      [testTrigram, testTrigram],
      [testTrigram, testString],
    ].forEach(
      ([a, b]) => expect(getTrigramSimilarity(a, b)).toEqual(1),
    );

    // Similar
    [
      [testString,  compareString],
      [testString,  compareTrigram],
      [testTrigram, compareTrigram],
      [testTrigram, compareString],
    ].forEach(
      ([a, b]) => expect(getTrigramSimilarity(a, b)).toBeCloseTo(expected, precision),
    );
  });
});
