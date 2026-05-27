import { throttle } from '@/functions/throttle';
import { sleep } from '@/timers/sleep';
import { describe, expect, test } from 'vitest';


describe('functions/throttle()', () => {
  test('it will throttle the rate at which a function is executed', async () => {
    const results: number[] = [];

    const throttledFn = throttle((num: number) => num, {
      delay    : 400,
      callback : ( num ) => results.push(num),
    });

    throttledFn(1);
    throttledFn(2);
    throttledFn(3);

    await sleep(250);

    throttledFn(4);

    await sleep(300);

    throttledFn(5);
    throttledFn(6);
    throttledFn(7);

    await sleep(250);

    throttledFn(8);

    await sleep(300);

    throttledFn(9);

    await sleep(500);

    expect(results).to.deep.equal([1, 5, 9]);
  });


  test('it throws an error when the "frame" delay option is used in a non-browser context', () => {
    expect(
      () => throttle(() => { /* noop */ }, { delay: 'frame' }),
    ).to.throw();
  });
});
