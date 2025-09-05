import { serializeQueryValue } from '@/urls/serialize-query-value';
import { describe, expect, test } from 'vitest';


describe('urls/serializeQueryValue()', () => {
  test('it serializes a variety of input values into a form suitable for placing into a URL query', () => {
    expect(serializeQueryValue('hello world')).toEqual('hello%20world');
    expect(serializeQueryValue(123_456)).toEqual('123456');
    expect(serializeQueryValue(true)).toEqual('true');
    expect(serializeQueryValue(null)).toEqual(null);
    expect(serializeQueryValue(undefined)).toEqual(undefined);
    expect(serializeQueryValue(['a', 'b'])).to.deep.equal(['a', 'b']);
    expect(serializeQueryValue([1, 2, 3])).to.deep.equal(['1', '2', '3']);

    expect(
      // @ts-expect-error - purposefully passing in bad data
      serializeQueryValue(['a', null, 'b', undefined, 3]),
    ).to.deep.equal(['a', 'b', '3']);
  });
});
