import { getFirstAvailableImageFileDescriptor } from '#images/get-first-available-image-file-descriptor.js';
import { normalizeImageFileDescriptor } from '#images/normalize-image-file-descriptor.js';
import { describe, expect, test } from 'vitest';


describe('images/getImageUrl()', () => {
  test('it creates a URL from one of several sources', () => {
    const descriptorA = normalizeImageFileDescriptor('img.png');

    expect(
      getFirstAvailableImageFileDescriptor([null, '', descriptorA]),
    ).to.have.property('identifier').which.equals('img.png');

    expect(
      getFirstAvailableImageFileDescriptor([null, [descriptorA, { width: 500}]]),
    ).to.have.property('width').which.equals(500);

    expect(
      getFirstAvailableImageFileDescriptor([null, '']),
    ).to.have.property('identifier').which.equals(undefined);
  });
});
