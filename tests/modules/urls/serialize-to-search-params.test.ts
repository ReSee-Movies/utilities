import { serializeToSearchParams } from '@/urls/serialize-to-search-params';
import { describe, expect, test } from 'vitest';


describe('urls/serializeToSearchParams()', () => {
  test('it creates a URLSearchParams instance', () => {
    const result = serializeToSearchParams({
      keyA: 'Hello World',
      keyB: 123_456,
      keyC: true,
      keyD: null,
      keyE: undefined,
      keyF: ['a', 'b'],
      keyG: [1, 2, 3],
      // @ts-expect-error - purposefully passing in bad data
      keyH: ['a', null, 'b', undefined, 3],
    });

    expect(result.get('keyA')).toEqual('Hello%20World');
    expect(result.get('keyB')).toEqual('123456');
    expect(result.get('keyC')).toEqual('true');
    expect(result.has('keyD')).toEqual(false);
    expect(result.has('keyE')).toEqual(false);

    expect(result.getAll('keyF')).to.deep.equal(['a', 'b']);
    expect(result.getAll('keyG')).to.deep.equal(['1', '2', '3']);
    expect(result.getAll('keyH')).to.deep.equal(['a', 'b', '3']);
  });
});
