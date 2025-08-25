/**
 * Slices an array into a set of smaller arrays no larger than `chunkSize`.
 * The last array to be generated may be shorter than the others, equal in
 * length to the remainder of `array.length / chunkSize`.
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];

  if (array.length <= chunkSize) {
    return [array.slice()];
  }

  const chunkCount = Math.ceil(array.length / chunkSize);

  for (let i = 0; i < chunkCount; i += 1) {
    const startIdx = i * chunkSize;

    result.push(
      array.slice(startIdx, startIdx + chunkSize),
    );
  }

  return result;
}
