/**
 * Possible swipe directions.
 */
export type SwipeDirection = 'up' | 'down' | 'left' | 'right' | 'tap';

/**
 * The method that will be executed by {@link detectSwipeEvent} when it
 * determines the direction of a pointer swipe.
 */
export type SwipeListener = (direction: SwipeDirection) => void;

/**
 * The object returned by the {@link detectSwipeEvent} function.
 */
export type DetectSwipeEventReturn = {
  /**
   * Detach the event listeners from the swipe target.
   */
  stop: () => void;
};

/**
 * Watches for "swipe" interactions with the target element.
 *
 * For the purposes of this function, a swipe is a relatively simple
 * interaction which consists of two {@link PointerEvent} events -
 * `pointerdown` followed by `pointerup` - whose screen positions differ.
 *
 * Since most gestures are not going to be perfectly horizontal or
 * vertical, the X and Y axis deltas are compared, and the larger of the
 * two is used as the axis of change.
 *
 * When the start and end points are identical, or the X and Y deltas
 * are identical (a gesture was made at a perfect 45-degree angle, impressive),
 * then the special "tap" direction is reported.
 */
export function detectSwipeEvent(target: EventTarget, callback: SwipeListener): DetectSwipeEventReturn {
  const start = { x: 0, y: 0 };

  const handlePointerDown = (event: Event) => {
    start.x = (event as PointerEvent).screenX;
    start.y = (event as PointerEvent).screenY;
  };

  const handlePointerUp = (event: Event) => {
    callback(
      determineDirection(start, {
        x: (event as PointerEvent).screenX,
        y: (event as PointerEvent).screenY,
      }),
    );
  };

  target.addEventListener('pointerdown', handlePointerDown);
  target.addEventListener('pointerup', handlePointerUp);

  return {
    stop() {
      target.removeEventListener('pointerdown', handlePointerDown);
      target.removeEventListener('pointerup', handlePointerUp);
    }
  }
}

type Point = {
  x: number;
  y: number;
};

/**
 * Compares two points and returns the name of the direction with
 * the largest change between the two.
 */
function determineDirection(start: Point, end: Point): SwipeDirection {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  }

  if (Math.abs(deltaX) < Math.abs(deltaY)) {
    return deltaY > 0 ? 'down' : 'up';
  }

  return 'tap';
}
