import { detectSwipeEvent } from '@/dom/detect-swipe-event';
import { describe, expect, test } from 'vitest';
import { page, userEvent, commands } from 'vitest/browser';


describe('dom/detect-swipe-events()', () => {
  test('it determines the direction of a pointer "swipe" across a target element', async () => {
    const element = document.createElement('div');
    const results = [] as string[];

    element.dataset.testid = 'test-element';
    element.style.width    = '500px';
    element.style.height   = '500px';

    document.body.appendChild(element);

    expect(page.getByTestId('test-element')).toBeInTheDocument();

    const { stop } = detectSwipeEvent(element, (direction) => results.push(direction));

    await userEvent.click(element, { delay: 200 });

    const positions = [
      [10, 10, 20, 10], // Pointer moves 10px right
      [20, 10, 10, 10], // Pointer moves 10px left
      [10, 10, 10, 20], // Pointer moves 10px down
      [10, 20, 10, 10], // Pointer moves 10px up
    ];

    for (const pos of positions) {
      await commands.point({
        start : { x: pos[0], y: pos[1] },
        end   : { x: pos[2], y: pos[3] },
      });
    }

    await userEvent.click(element, { delay: 200 });

    stop();

    await userEvent.click(element, { delay: 200 });
    await userEvent.click(element, { delay: 200 });

    expect(results).to.deep.equal(['tap', 'right', 'left', 'down', 'up', 'tap']);
  });
});
