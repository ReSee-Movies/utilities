import { slugify } from '#strings/slugify.js';
import { describe, expect, test } from 'vitest';

describe('strings/slugify()', () => {
  test('it will turn a string into a URL safe slug', () => {
    expect(slugify('to error isQuite Human')).toEqual('to-error-isquite-human');
  });

  test('it will concatenate multiple strings', () => {
    expect(slugify(['to error', 23, true])).toEqual('to-error-23-true');
  });

  test('it will ignore nullish inputs', () => {
    expect(slugify(null)).toEqual('');
    expect(slugify(undefined)).toEqual('');
    expect(slugify([null, ' '])).toEqual('');
  });

  test('it can be used to kebab-case string values', () => {
    expect(slugify('kebabCaseMe', { decamelize: true })).toEqual('kebab-case-me');
  });
});
