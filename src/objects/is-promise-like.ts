import { isObjectLike } from './is-object-like';

/**
 * Type-guard that checks whether an object looks like a promise; namely,
 * that it has a `then()` method.
 */
export function isPromiseLike<T>(obj: unknown): obj is PromiseLike<T> {
  return isObjectLike(obj) && 'then' in obj && typeof obj.then === 'function';
}
