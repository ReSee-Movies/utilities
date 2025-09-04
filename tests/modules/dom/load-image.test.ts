import { loadImage } from '@/dom/load-image';
import { describe, expect, test } from 'vitest';

describe('loadImage()', () => {
  test('it returns the provided argument when the Image global is not available', async () => {
    expect(await loadImage('https://foo.bar/img.png')).to.equal('https://foo.bar/img.png');
  });
});
