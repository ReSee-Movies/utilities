/**
 * Type-guard that checks whether an object looks like a promise; namely,
 * that it has a `then()` method.
 */
export function isPromiseLike<T>(obj: unknown): obj is PromiseLike<T> {
  if (obj && typeof obj === 'object') {
    return (obj.toString() === '[object Promise]') || 'then' in obj && typeof obj.then === 'function';
  }

  return false;
}
