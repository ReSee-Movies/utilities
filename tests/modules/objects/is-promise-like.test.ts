import { isPromiseLike } from '@/objects/is-promise-like';
import { describe, expect, test } from 'vitest';


describe('objects/isPromiseLike()', () => {
  test('it checks that the identity of the argument is a "thenable"', async () => {
    const thenable = { then() {} };
    const promise  = Promise.resolve();

    expect(isPromiseLike(thenable)).toEqual(true);
    expect(isPromiseLike(promise)).toEqual(true);

    await promise;

    expect(isPromiseLike(null)).toEqual(false);
    expect(isPromiseLike({})).toEqual(false);
  });
});
