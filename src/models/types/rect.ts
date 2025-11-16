import { makeNonNegativeNumber, NonNegativeNumber } from './nonNegativeNumber';
import { makePositiveNumber, PositiveNumber } from './positiveNumber';

export interface Rect {
  x: NonNegativeNumber;
  y: NonNegativeNumber;
  width: PositiveNumber;
  height: PositiveNumber;
}

export function makeRect(x: number, y: number, width: number, height: number): Rect {
  try {
    return {
      x: makeNonNegativeNumber(x),
      y: makeNonNegativeNumber(y),
      width: makePositiveNumber(width),
      height: makePositiveNumber(height),
    };
  } catch (error) {
    throw new Error(`Invalid Rect parameters: ${error}`);
  }
}

export function rectContains(outer: Rect, inner: Rect): boolean {
  const containsLeft = inner.x >= outer.x;
  const containsRight = inner.x + inner.width <= outer.x + outer.width;
  const containsTop = inner.y >= outer.y;
  const containsBottom = inner.y + inner.height <= outer.y + outer.height;
  return [containsLeft, containsRight, containsTop, containsBottom].every(Boolean);
}

export function rectIntersects(a: Rect, b: Rect): boolean {
  const overlapLeft = a.x + a.width > b.x;
  const overlapRight = b.x + b.width > a.x;
  const overlapTop = a.y + a.height > b.y;
  const overlapBottom = b.y + b.height > a.y;
  return [overlapLeft, overlapRight, overlapTop, overlapBottom].every(Boolean);
}
