/**
 * Creates a Promise that resolves after the provided number of
 * milliseconds.
 */
export async function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}
