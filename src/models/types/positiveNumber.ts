import { Brand } from './brand';

// Non-negative and greater than Zero (0)
// TODO: use a better math library to enforce math type constraints
export type PositiveNumber = Brand<number, 'PositiveNumber'>;

export function makePositiveNumber(value: number): PositiveNumber {
  if (value <= 0) {
    throw new Error(`Value must be a greater than Zero (0): ${value}`);
  }
  return value as PositiveNumber;
}
