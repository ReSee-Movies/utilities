import { deserializeQueryValue } from '@/urls/deserialize-query-value';
import { describe, expect, test } from 'vitest';


describe('urls/deserializeQueryValue()', () => {
  test('it deserializes a base value into something more complex', () => {
    expect(deserializeQueryValue('hello%20world', String)).toEqual('hello world');
    expect(deserializeQueryValue('hello%20world', [String])).toEqual(['hello world']);
    expect(deserializeQueryValue(['a', 'b'],      [String])).toEqual(['a', 'b']);


    expect(deserializeQueryValue('hello',    Number)).toEqual(undefined);
    expect(deserializeQueryValue('123456',   Number)).toEqual(123_456);
    expect(deserializeQueryValue('hello',    [Number])).toEqual(undefined);
    expect(deserializeQueryValue('123456',   [Number])).toEqual([123_456]);
    expect(deserializeQueryValue(['1', '2'], [Number])).toEqual([1, 2]);


    expect(deserializeQueryValue('hello', Boolean)).toEqual(undefined);
    expect(deserializeQueryValue('true',  Boolean)).toEqual(true);
    expect(deserializeQueryValue('yes',   Boolean)).toEqual(true);
    expect(deserializeQueryValue('1',     Boolean)).toEqual(true);
    expect(deserializeQueryValue(null,    Boolean)).toEqual(true);
    expect(deserializeQueryValue('false', Boolean)).toEqual(false);
    expect(deserializeQueryValue('no',    Boolean)).toEqual(false);
    expect(deserializeQueryValue('0',     Boolean)).toEqual(false);


    expect(deserializeQueryValue('hello', null)).toEqual(null);
    expect(deserializeQueryValue('hello', undefined)).toEqual(undefined);

    // @ts-expect-error - purposefully passing bad data
    expect(() => deserializeQueryValue('hello', Symbol)).to.throw();
  });
});
