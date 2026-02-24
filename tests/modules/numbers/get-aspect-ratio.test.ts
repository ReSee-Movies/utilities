import { getAspectRatio } from '#numbers/get-aspect-ratio.js';
import { describe, expect, test } from 'vitest';

describe('numbers/getAspectRatio()', () => {
  test('when given one side of an x/y rectangle, returns an x & y aspect ratio', () => {
    expect(getAspectRatio(100, 'x', 'video')).to.deep.equal({ x: 100, y: 56 });
    expect(getAspectRatio(56, 'y', 'video')).to.deep.equal({ x: 100, y: 56 });
  });
});
