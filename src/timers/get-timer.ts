const formatter = new Intl.NumberFormat();

/**
 * The Timer class provides an easy interface for working with
 * DOMHighResolutionTimestamps via the `performance` API. When
 * instantiated, the value of `performance.now()` is recorded.
 * The `mark` method can then be used to retrieve the duration
 * passed since instantiation.
 */
export class Timer {
  protected _start = performance.now();

  public get startTime() {
    return this._start;
  }

  public reset() {
    this._start = performance.now();
  }

  public mark(format: false): number;
  public mark(format: true): string;
  public mark(format?: undefined): number;

  public mark(format = false) {
    const value = performance.now() - this._start;
    return format ? formatter.format(value) : value;
  }
}


/**
 * Creates and returns an instance of the Timer class.
 */
export function getTimer() {
  return new Timer();
}
