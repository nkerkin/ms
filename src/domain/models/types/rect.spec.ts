import { NonNegativeNumber } from './nonNegativeNumber';
import { PositiveNumber } from './positiveNumber';
import { makeRect, rectContains, rectIntersects } from './rect';

describe('makeRect', () => {
  it('should create a Rect with valid parameters', () => {
    // arrange
    const [x, y, width, height] = [10, 20, 30, 40];
    // act
    const rect = makeRect(x, y, width, height);
    // assert
    expect(rect).toBeDefined();
    expect(rect.x).toBe(10 as NonNegativeNumber);
    expect(rect.y).toBe(20 as NonNegativeNumber);
    expect(rect.width).toBe(30 as PositiveNumber);
    expect(rect.height).toBe(40 as PositiveNumber);
  });
});

it('should throw an error for negative values', () => {
  // arrange
  const cases = [
    [-10, 20, 30, 40],
    [10, -20, 30, 40],
    [10, 20, -30, 40],
    [10, 20, 30, -40],
  ];
  // act & assert

  for (const [x, y, width, height] of cases) {
    expect(() => makeRect(x, y, width, height)).toThrowError(/Invalid Rect parameters: /);
  }
});

describe('rectContains', () => {
  it('should return true when outer rect contains inner rect', () => {
    // arrange
    const outer = makeRect(0, 0, 100, 100); // endpoint 100,100
    const inner = makeRect(10, 10, 50, 50); // endpoint 60,60
    // act
    const result = rectContains(outer, inner);
    // assert
    expect(result).toBe(true);
  });

  it('should return false when outer rect does not contain inner rect', () => {
    // arrange
    const outer = makeRect(0, 0, 10, 10);
    const inner = makeRect(30, 10, 10, 10);
    // act
    const result = rectContains(outer, inner);
    // assert
    expect(result).toBe(false);
  });

  it('should return false when inner rect intersects the edge of outer rect', () => {
    // arrange
    const outer = makeRect(0, 0, 100, 100); // endpoint 100,100
    const inner = makeRect(50, 50, 100, 100); // endpoint 150,150
    // act
    const result = rectContains(outer, inner);
    // assert
    expect(result).toBe(false);
  });
});

describe('rectIntersects', () => {
  it('should return true when two rects intersect', () => {
    // arrange
    const a = makeRect(0, 0, 100, 100); // endpoint 100,100
    const b = makeRect(50, 50, 100, 100); // endpoint 150,150
    // act
    const result = rectIntersects(a, b);
    // assert
    expect(result).toBe(true);
  });

  it('should return false when two rects do not intersect', () => {
    // arrange
    const a = makeRect(0, 0, 10, 10); // endpoint 10,10
    const b = makeRect(20, 20, 10, 10); // endpoint 30,30
    // act
    const result = rectIntersects(a, b);
    // assert
    expect(result).toBe(false);
  });

  it('should return true when the outer rect fully contains the inner rect', () => {
    // arrange
    const a = makeRect(0, 0, 100, 100); // endpoint 100,100
    const b = makeRect(10, 10, 50, 50); // endpoint 60,60
    // act
    const result = rectIntersects(a, b);
    // assert
    expect(result).toBe(true);
  });
});
