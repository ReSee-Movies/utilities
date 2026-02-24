import { waitForAnimationEnd } from '@/dom/wait-for-animation-end';
import { getTimer } from '@/timers/get-timer';
import { sleep } from '@/timers/sleep';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';


describe('waitForAnimationEnd()', () => {
  test('it waits for the transitionend event of an element', async () => {
    const element = document.createElement('div');

    element.dataset.testid           = 'test-element';
    element.style.width              = '200px';
    element.style.height             = '200px';
    element.style.backgroundColor    = 'blue';
    element.style.transitionProperty = 'background-color';
    element.style.transitionDuration = '500ms';

    document.body.appendChild(element);

    expect(page.getByTestId('test-element')).toBeInTheDocument();

    // Need to let things tick over for the transition to be applied.
    await sleep(16);

    const timer = getTimer();

    element.style.backgroundColor = 'green';
    await waitForAnimationEnd(element, 5000);

    const duration = timer.mark();

    // Checking this duration just to see that it did indeed wait some,
    // but not so much as the timeout.
    expect(duration).to.be.greaterThan(100).and.lessThan(1000);

    document.body.removeChild(element);
  });


  test('it waits for the animationend event of an element', async () => {
    const element = document.createElement('div');
    const styles  = document.createElement('style');

    styles.dataset.testid = 'test-styles';
    styles.innerText      = '.green-bg { animation-name: changeBg; } @keyframes changeBg { from { background-color: blue } to { background-color: green } }';

    element.dataset.testid                = 'test-element';
    element.style.width                   = '200px';
    element.style.height                  = '200px';
    element.style.backgroundColor         = 'blue';
    element.style.animationDuration       = '500ms';
    element.style.animationIterationCount = '1';

    document.body.append(styles, element);

    expect(page.getByTestId('test-styles')).toBeInTheDocument();
    expect(page.getByTestId('test-element')).toBeInTheDocument();

    // Need to let things tick over for the transition to be applied.
    await sleep(16);

    const timer = getTimer();

    element.classList.add('green-bg');
    await waitForAnimationEnd(element, 5000);

    const duration = timer.mark();

    // Checking this duration just to see that it did indeed wait some,
    // but not so much as the timeout.
    expect(duration).to.be.greaterThan(100).and.lessThan(1000);

    document.body.removeChild(element);
  });
});
