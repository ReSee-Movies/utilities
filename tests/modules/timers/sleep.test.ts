import { getTimer } from '#timers/get-timer.js';
import { sleep } from '#timers/sleep.js';
import { describe, expect, test } from 'vitest';


describe('timers/sleep()', () => {
  test('it returns a promise which resolves after the configured duration', async () => {
    const timer = getTimer();

    await sleep(500);

    expect(timer.mark()).to.be.greaterThan(450).and.lessThan(550);
  });
});
