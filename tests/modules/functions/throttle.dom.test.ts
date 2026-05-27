import { throttle } from '@/functions/throttle';
import { sleep } from '@/timers/sleep';
import { describe, expect, test, vi } from 'vitest';


describe('functions/throttle()', () => {
  test('it will throttle the rate at which a function is executed', async () => {
    const results: string[] = [];

    const throttledFn = throttle((str: string) => str, {
      delay    : 400,
      callback : ( str ) => results.push(str),
    });

    throttledFn('a');
    throttledFn('b');
    throttledFn('c');

    await sleep(250);

    throttledFn('d');

    await sleep(300);

    throttledFn('e');
    throttledFn('f');
    throttledFn('g');

    await sleep(250);

    throttledFn('h');

    await sleep(300);

    throttledFn('i');

    await sleep(500);

    expect(results).to.deep.equal(['a', 'e', 'i']);
  });


  test('it will throttle to animation frame requests', async () => {
    vi.useFakeTimers();

    const results: string[] = [];

    const throttledFn = throttle((str: string) => str, {
      delay    : 'frame',
      callback : ( str ) => results.push(str),
    });

    throttledFn('a');
    throttledFn('b');

    vi.advanceTimersToNextFrame();

    throttledFn('c');
    throttledFn('d');

    vi.advanceTimersToNextFrame();

    throttledFn('e');

    vi.advanceTimersToNextFrame();

    expect(results).to.deep.equal(['a', 'c', 'e']);
  });
});
