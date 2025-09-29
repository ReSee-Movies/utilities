import { generateTrigram } from '@/strings/generate-trigram';
import { describe, expect, test } from 'vitest';

describe('strings/generateTrigram()', () => {
  test('it creates an array of trigrams from a string', () => {
    expect(
      generateTrigram('Hello World'),
    ).to.deep.equal(
      ['ld ', 'rld', 'orl', 'wor', ' wo', '  w', 'lo ', 'llo', 'ell', 'hel', ' he', '  h'],
    );

    expect(
      generateTrigram('Hello Mars'),
    ).to.deep.equal(
      ['rs ', 'ars', 'mar', ' ma', '  m', 'lo ', 'llo', 'ell', 'hel', ' he', '  h'],
    );

    expect(generateTrigram('   ')).to.deep.equal([]);
  });
});
