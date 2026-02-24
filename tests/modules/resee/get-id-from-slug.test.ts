import { getIdFromSlug } from '@/resee/get-id-from-slug';
import { describe, expect, test } from 'vitest';

describe('resee/getIdFromSlug()', () => {
  test('it returns a numeric prefix of a string', () => {
    expect(getIdFromSlug('123-foo-bar', 'number')).toEqual(123);
    expect(getIdFromSlug('345-678-baz', 'number')).toEqual(345);
    expect(getIdFromSlug(567, 'number')).toEqual(567);
    expect(getIdFromSlug('foo-bar', 'number')).toEqual(undefined);
    expect(getIdFromSlug(false, 'number')).toEqual(undefined);
  });

  test('it returns a UUID prefix of a string', () => {
    const validUUID = 'abcd1234-ab12-4ab1-8abc-abcdef123456';

    expect(getIdFromSlug(validUUID, 'uuid')).toEqual(validUUID);
    expect(getIdFromSlug(`${ validUUID }-and-some-more`, 'uuid')).toEqual(validUUID);
    expect(getIdFromSlug(validUUID.substring(0, 30), 'uuid')).toEqual(undefined);
  });

  test('it returns a UUID prefix of a string', () => {
    expect(getIdFromSlug('foo-bar-baz', 'first-2')).toEqual('foo-bar');
    expect(getIdFromSlug(`foo-bar-baz`, 'first-1')).toEqual('foo');
    expect(getIdFromSlug(null, 'first-2')).toEqual(undefined);
  });
});
