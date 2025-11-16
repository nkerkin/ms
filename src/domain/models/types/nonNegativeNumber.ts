import { Brand } from './brand';

// Non-negative (0 or greater)
// TODO: use a better math library to enforce integer constraint
export type NonNegativeNumber = Brand<number, 'NonNegativeNumber'>;

export function makeNonNegativeNumber(value: number): NonNegativeNumber {
  if (value < 0) {
    throw new Error(`Value must be a non-negative: ${value}`);
  }
  return value as NonNegativeNumber;
}
