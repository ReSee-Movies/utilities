import { hasKey } from '#objects/has-key.js';
import { describe, expect, test } from 'vitest';

describe('objects/hasKey()', () => {
  test('it checks the keys of an object', () => {
    const symbolKey  = Symbol();
    const testObject = { keyA: '1', 2 : '2', [symbolKey]: '3' };

    expect(hasKey(testObject, 'keyA')).toEqual(true);
    expect(hasKey(testObject, 2)).toEqual(true);
    expect(hasKey(testObject, symbolKey)).toEqual(true);

    expect(hasKey(testObject, 'keyB')).toEqual(false);
    expect(hasKey(testObject, 3)).toEqual(false);
    expect(hasKey(testObject, Symbol())).toEqual(false);
  });
});
