import { findClosestTrigramMatch } from '#strings/find-closest-trigram-match.js';
import { generateTrigram } from '#strings/generate-trigram.js';
import { describe, expect, test } from 'vitest';

describe('strings/findClosestTrigramMatch()', () => {
  test('it finds the candidate that most closely matches the test subject', () => {

    const candidates = [
      { name: 'a', trigram: generateTrigram('Hello World') },
      { name: 'b', trigram: generateTrigram('Hello Mars') },
      { name: 'c', trigram: generateTrigram('Hello Venus') },
      { name: 'd', trigram: generateTrigram('Hello Mercury') },
    ];

    let result = findClosestTrigramMatch('Hello Mimus', candidates);

    expect(result?.candidate.name).toEqual('b');

    result = findClosestTrigramMatch('Hello World', candidates);

    expect(result?.candidate.name).toEqual('a');

    result = findClosestTrigramMatch(
      ['us ', 'nus', 'enu', 'ven', ' ve', '  v', 'lo ', 'llo', 'ell', 'hel', ' he', '  h'],
      candidates,
    );

    expect(result?.candidate.name).toEqual('c');
  });
});
