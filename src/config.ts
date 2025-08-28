/**
 * There are a few values used throughout this package that are either subject
 * to change depending on the usage, or just a bit too - important, I suppose -
 * to bury down in some random file. This is the home for those such things.
 *
 * @module
 */

import { isObjectLike } from './objects/is-object-like';

/**
 * Runtime constants can be set once and then used throughout this utilities
 * package.
 */
export type ReseeUtilitiesRuntimeConstants = {
  tmdbImageBaseUrl  : string;
  reseeImageBaseUrl : string;
};

const RuntimeConstants: ReseeUtilitiesRuntimeConstants = {
  tmdbImageBaseUrl  : 'https://image.tmdb.org/t/p/',
  reseeImageBaseUrl : '',
};


/**
 * Set one or more ReSee Utilities package global constants.
 */
export function setReseeUtilityConstants(values: Partial<ReseeUtilitiesRuntimeConstants>): void;

export function setReseeUtilityConstants<
  K extends keyof ReseeUtilitiesRuntimeConstants,
>(key: K, value: ReseeUtilitiesRuntimeConstants[K]): void;

export function setReseeUtilityConstants<
  K extends keyof ReseeUtilitiesRuntimeConstants,
>(
  keyOrObject: K | Partial<ReseeUtilitiesRuntimeConstants>,
  valueOrUndef?: ReseeUtilitiesRuntimeConstants[K],
): void {
  if (isObjectLike(keyOrObject)) {
    Object.assign(RuntimeConstants, keyOrObject);
  }
  else if (valueOrUndef) {
    RuntimeConstants[keyOrObject] = valueOrUndef;
  }
}


/**
 * Retrieve a ReSee Utilities package global constant.
 */
export function getReseeUtilityConstants<
  K extends keyof ReseeUtilitiesRuntimeConstants,
>(key: K): ReseeUtilitiesRuntimeConstants[K] {
  return RuntimeConstants[key];
}
