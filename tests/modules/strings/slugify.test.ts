import { slugify } from '@/strings/slugify';
import { describe, expect, test } from 'vitest';

describe('strings/slugify()', () => {
  test('it will turn a string into a URL safe slug', () => {
    expect(slugify('to error isQuite Human')).toEqual('to-error-isquite-human');
  });
});
