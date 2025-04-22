/**
 * A utility method that returns a promise which is resolved the next time that the
 * "animationend" or "transitionend" event is emitted from the provided `target`
 * element. This makes it easy to string together multiple animations in sequence:
 *
 * @example
 * async function closeModal() {
 *     dialogElement.classList.add('collapse');
 *
 *     await waitForAnimationEnd(dialogElement);
 *
 *     dialogElement.classList.remove('collapse');
 *     dialogElement.classList.add('fade-out');
 *
 *     await waitForAnimationEnd(dialogElement);
 *
 *     modalClosed();
 * }
 */
export async function waitForAnimationEnd(target: HTMLElement, fallbackTimeout: number = 500) {
  return new Promise<void>((resolve) => {
    if (!window) {
      resolve();
      return;
    }

    let timeoutId: number | undefined = undefined;
    let called = false;

    const complete = () => {
      if (called) {
        return;
      }

      called = true;

      target.removeEventListener('animationend', complete);
      target.removeEventListener('transitionend', complete);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      resolve();
    };

    timeoutId = setTimeout(complete, fallbackTimeout);

    target.addEventListener('animationend', complete);
    target.addEventListener('transitionend', complete);
  });
}
