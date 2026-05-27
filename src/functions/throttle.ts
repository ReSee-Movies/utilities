import { hasDom } from '../dom/has-dom';

/**
 * Represents a function with any number/type of arguments, and any return.
 */
export type GenericFunction = (...args: never[]) => unknown;

/**
 * Options to control the behavior of the throttling.
 */
export type ThrottleOptions<TargetFn extends GenericFunction = GenericFunction> = {
  /**
   * The amount of time between call and execution of the throttled
   * method, during which subsequent calls will be dropped. Can be either
   * a number of milliseconds, or the string "frame", which will queue calls
   * using `requestAnimationFrame()`.
   *
   * @defaultValue "frame" in browser contexts, 0 otherwise
   */
  delay?: number | 'frame';

  /**
   * A function that will be executed immediately after each execution of the
   * throttled function, receiving that function's return value.
   */
  callback?: (returnValue: ReturnType<TargetFn>) => void;
};

/**
 * The function that is returned by the {@link throttle} function. It will accept
 * the same parameters as the function that it is wrapping, but will always itself
 * return void. If you need the return of the throttled function after it is
 * invoked, see {@link ThrottleOptions.callback}.
 */
export type ThrottlingFunction<TargetFn extends GenericFunction = GenericFunction>
  = (...args: Parameters<TargetFn>) => void;

/**
 * Throttles calls to the provided function by providing a wrapping function
 * to be called in its place.
 */
export function throttle<TargetFn extends GenericFunction>(
  target   : TargetFn,
  options? : ThrottleOptions<TargetFn>,
): ThrottlingFunction<TargetFn> {
  let inThrottle = false;

  const delay = options?.delay ?? (hasDom() ? 'frame' : 0);

  if (!hasDom() && delay === 'frame') {
    throw new Error('RAF throttling only works in browser environments.');
  }

  function executeTargetMethod(...args: Parameters<TargetFn>) {
    const result = target(...args) as ReturnType<TargetFn>;
    options?.callback?.(result);
    inThrottle = false;
  }

  return function throttlingFunction(...args: Parameters<TargetFn>) {
    if (inThrottle) {
      return;
    }

    inThrottle = true;

    if (delay === 'frame') {
      window.requestAnimationFrame(() => executeTargetMethod(...args));
    }
    else {
      setTimeout(() => executeTargetMethod(...args), delay);
    }
  }
}
