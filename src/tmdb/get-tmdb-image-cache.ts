import { loadImage } from '../dom/load-image';
import { isNumber } from '../numbers/is-number';
import { isString } from '../strings/is-string';
import { fromTmdbImageSize } from './from-tmdb-image-size';
import { toTmdbImageSize } from './to-tmdb-image-size';
import { getTmdbImageUrl } from './get-tmdb-image-url';


let cacheInstance: TmdbImageCache | undefined = undefined;

/**
 * Returns the singleton instance of the TmdbImageCache.
 */
export function getTmdbImageCache() {
  return cacheInstance ?? (cacheInstance = new TmdbImageCache());
}


/**
 * A Promise, with the additional property `placeholderUrl` which can be used until the
 * promise resolves with a better image asset.
 */
export class TmdbImageCacheResult extends Promise<string> {
  public readonly placeholderUrl: string | undefined;

  constructor(
    executorFunction: (resolve: (value: string) => void, reject: (reason?: unknown) => void) => void,
    placeholderUrl: string | undefined,
  ) {
    super(executorFunction);
    this.placeholderUrl = placeholderUrl;
  }
}


/**
 * The TmdbImageCache keeps track of images that have been downloaded from TMDB
 * at a given resolution. This provides a mechanism to immediately provide an
 * image asset when available, and then later upgrade it to a move high-resolution
 * version.
 */
export class TmdbImageCache {
  protected cache: Map<string, number[]> = new Map();


  /**
   * Retrieve a full URL for a TMDB image asset. This method will return a string if
   * a suitable image asset already exists for the request, or if the method is being
   * called from a server context where the `Image` class is not available. Otherwise,
   * a `TmdbImageCacheResult` promise will be returned, which may or may not have its
   * `placeholder` property set. If set, this can be used while the promise itself is
   * pending.
   */
  public getImage(src: string, size?: string) {
    const requested = this.toParts(src, size);
    const available = this.getClosestInCache(requested.imageId, requested.numericSize);

    const availableUrl = available
      ? getTmdbImageUrl(available.imageId, toTmdbImageSize(available.numericSize))
      : undefined;

    // 1. An image of adequate resolution has already been loaded.
    if (available?.status === 'available' && availableUrl) {
      return availableUrl;
    }

    // 2. A smaller version of the desired image is available. Show it, and load the higher resolution one.
    // 3. No version of the requested image is available. Load it.
    const { imageId, numericSize } = requested;

    const loadImageResult = loadImage(
      getTmdbImageUrl(imageId, toTmdbImageSize(numericSize)),
    );

    if (isString(loadImageResult)) {
      return loadImageResult;
    }

    return new TmdbImageCacheResult((resolve, reject) => {
      loadImageResult.then(
        (url) => { this.addToCache(imageId, numericSize); resolve(url); },
        (evt) => reject(evt),
      );
    }, availableUrl);
  }


  /**
   * Add the provided imageId at the given resolution to the cache, indicating that it
   * has already been downloaded and is available for use.
   */
  protected addToCache(imageId: string, requestedSize: number) {
    const cacheValue = this.cache.get(imageId) ?? [];

    if (!cacheValue.includes(requestedSize)) {
      cacheValue.push(requestedSize);
      this.cache.set(imageId, cacheValue);
    }
  }


  /**
   * Checks the cache Map for the existence of the requested image. If the requested
   * image has already been loaded at the desired resolution or higher, then this
   * method returns a status of "available", otherwise a status of "required" is returned.
   */
  protected getClosestInCache(imageId: string, requestedSize: number) {
    const cacheValue = this.cache.get(imageId);

    if (!cacheValue?.length) {
      return undefined;
    }

    let smaller = NaN;
    let larger  = NaN;

    for (const entry of cacheValue) {
      if (entry >= requestedSize) {
        larger = entry;
        break;
      }

      smaller = entry;
    }

    const numericSize = !isNaN(larger) ? larger : smaller;
    const status      = numericSize < requestedSize ? 'required' : 'available';

    return { imageId, numericSize, status };
  }


  /**
   * Extracts the TMDB image ID, and requested resolution, from the provided arguments.
   */
  protected toParts(src: string, size?: string) {
    let numericSize = size ? fromTmdbImageSize(size) : undefined;

    const srcPieces = src.split('/');
    const imageId   = srcPieces.at(-1);

    if (!isString(imageId)) {
      throw new Error('A TMDB image ID is required.');
    }

    if (srcPieces.length > 1 && !isNumber(numericSize)) {
      numericSize = fromTmdbImageSize(srcPieces.at(-2) ?? '');
    }

    if (!isNumber(numericSize)) {
      throw new Error('The resolution of the requested image could not be determined.');
    }

    return { numericSize, imageId };
  }
}
