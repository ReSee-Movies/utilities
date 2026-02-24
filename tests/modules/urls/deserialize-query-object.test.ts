import { deserializeQueryObject } from '@/urls/deserialize-query-object';
import { describe, expect, test } from 'vitest';


describe('urls/deserializeQueryObject()', () => {
  test('it deserializes a base value into something more complex', () => {
    const testValue = {
      keyA: 'hello%20world',
      keyB: '123456',
      keyC: 'true',
      keyF: ['a', 'b'],
      keyG: ['1', '2', '3'],
      keyH: 'not%20mapped%20value',
    };

    const testMapping = {
      keyA: { type: String },
      keyB: { type: Number },
      keyC: { type: Boolean },
      keyF: { type: [String] },
      keyG: { type: [Number] },
    };

    expect(
      deserializeQueryObject(testValue, testMapping),
    ).to.deep.equal({
      keyA: 'hello world',
      keyB: 123_456,
      keyC: true,
      keyF: ['a', 'b'],
      keyG: [1, 2, 3],
      keyH: 'not%20mapped%20value',
    });
  });
});
