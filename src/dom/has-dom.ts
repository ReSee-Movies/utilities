/**
 * Check whether the global "window" and "window.document" are available,
 * indicative of a web browser.
 */
export function hasDom() {
  try {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }
  catch {
    /* noop */
  }

  return false;
}
