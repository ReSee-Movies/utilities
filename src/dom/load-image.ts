/**
 * Load an image asset. In client environments, where `Image` is available, this
 * method will return a promise that resolves when the file is loaded (and decoded),
 * and rejects on any error encountered. In server environments, the value of `src`
 * is resolved immediately.
 */
export function loadImage(src: string) {
  // If running in a server context, Image will not be defined.
  try {
    if (Image) { /* No-op */ }
  }
  catch {
    return Promise.resolve(src);
  }

  return new Promise<string>((resolve, reject) => {
    const img   = new Image();
    img.src     = src;
    img.onerror = (ev) => reject(ev);
    img.onload  = () => img.decode().then(() => resolve(src));
  });
}
