import { serializeQueryObject } from '#urls/serialize-query-object.js';
import { describe, expect, test } from 'vitest';


describe('urls/serializeQueryObject()', () => {
  test('it serializes a variety of input values into a form suitable for placing into a URL query', () => {
    const testValue = {
      keyA: 'Hello World',
      keyB: 123_456,
      keyC: true,
      keyD: null,
      keyE: undefined,
      keyF: ['a', 'b'],
      keyG: [1, 2, 3],
      keyH: ['a', null, 'b', undefined, 3],
    };

    expect(
      // @ts-expect-error - purposefully passing in bad data
      serializeQueryObject(testValue),
    ).to.deep.equal({
      keyA: 'Hello%20World',
      keyB: '123456',
      keyC: 'true',
      keyD: null,
      keyE: undefined,
      keyF: ['a', 'b'],
      keyG: ['1', '2', '3'],
      keyH: ['a', 'b', '3'],
    });

    expect(
      // @ts-expect-error - purposefully passing in bad data
      serializeQueryObject(testValue, { removeNull: true, removeUndefined: true }),
    ).to.deep.equal({
      keyA: 'Hello%20World',
      keyB: '123456',
      keyC: 'true',
      keyF: ['a', 'b'],
      keyG: ['1', '2', '3'],
      keyH: ['a', 'b', '3'],
    });
  });
});
