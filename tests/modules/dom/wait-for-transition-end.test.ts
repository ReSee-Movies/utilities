import { waitForAnimationEnd } from '@/dom/wait-for-animation-end';
import { describe, expect, test } from 'vitest';

describe('loadImage()', () => {
  test('it resolves immediately if not in a browser environment', async () => {
    await expect(waitForAnimationEnd({} as HTMLElement, 1000)).resolves.to.equal(undefined);
  });
});
