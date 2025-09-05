import { getTimer } from '@/timers/get-timer';
import { sleep } from '@/timers/sleep';
import { describe, expect, test } from 'vitest';


describe('timers/getTimer()', () => {
  test('it returns a timer instance that can be used to measure duration', async () => {
    const timer = getTimer();

    await sleep(500);

    const markA = timer.mark();

    expect(markA).to.be.greaterThan(450).and.lessThan(550);

    expect(timer.startTime).to.be.a('number');
    expect(timer.mark(true)).to.be.a('string');

    await sleep(100);

    const markB = timer.mark();

    expect(markB).to.be.greaterThan(markA);

    timer.reset();

    await sleep(100);

    const markC = timer.mark();

    expect(markC).to.be.lessThan(markA);
  });
});
