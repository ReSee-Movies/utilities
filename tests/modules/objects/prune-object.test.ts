import { pruneObject } from '#objects/prune-object.js';
import { describe, expect, test } from 'vitest';


describe('objects/pruneObject()', () => {
  test('it creates a new object from a subset of a source object', () => {
    expect(
      pruneObject({ keyA: '1', keyB: '2', keyC: '3' }, ['keyA', 'keyC']),
    ).to.deep.equal({
      keyB: '2',
    });

    expect(pruneObject(null, ['keyA', 'keyC'])).to.deep.equal({});
  });
});
