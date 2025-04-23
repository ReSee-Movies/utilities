export const CommonAspectRatios = {
  '1/1'    : 1,
  'square' : 1,
  '2/3'    : 0.66667,
  'poster' : 0.66667,
  '4/5'    : 0.8,
  '16/9'   : 1.77778,
  'video'  : 1.77778,
} as const;

export type AspectRatio = keyof typeof CommonAspectRatios;

/**
 * Given a ratio constant, and a value corresponding to either the "x - numerator"
 * or "y - denominator" of that ratio, calculate the other value and return both.
 */
export function getAspectRatio(value: number, side: 'x' | 'y', ratio: AspectRatio) {
  return {
    x : Math.round(side === 'x' ? value : value * CommonAspectRatios[ratio]),
    y : Math.round(side === 'y' ? value : value * (1 / CommonAspectRatios[ratio])),
  };
}
