import { makePositiveNumber, PositiveNumber } from './positiveNumber';

describe('makePositiveNumber', () => {
  it('should create a PositiveNumber for values greater than Zero (0)', () => {
    // arrange
    const value = 42;
    // act
    const PositiveNumber = makePositiveNumber(value);
    // assert
    expect(PositiveNumber).toBeDefined();
    expect(PositiveNumber).toBe(42 as PositiveNumber);
  });

  it('should throw an error for negative values', () => {
    // arrange
    const value = -5;
    // act & assert
    expect(() => makePositiveNumber(value)).toThrowError(
      'Value must be a greater than Zero (0): -5'
    );
  });

  it('should throw an error for Zero (0)', () => {
    // arrange
    const value = 0;
    // act & assert
    expect(() => makePositiveNumber(value)).toThrowError(
      'Value must be a greater than Zero (0): 0'
    );
  });
});
