import { pluckObject } from '@/objects/pluck-object';
import { describe, expect, test } from 'vitest';


describe('objects/pluckObject()', () => {
  test('it creates a new object from a subset of a source object', () => {
    expect(
      pluckObject({ keyA: '1', keyB: '2', keyC: '3' }, ['keyA', 'keyC']),
    ).to.deep.equal({
      keyA: '1',
      keyC: '3',
    });

    expect(pluckObject(null, ['keyA', 'keyC'])).to.deep.equal({
      keyA: undefined,
      keyC: undefined,
    });
  });
});
