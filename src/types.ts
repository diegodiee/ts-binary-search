export type TOptions<T, R> = {
  compareFn?: (value: T, target: R) => number;
  lower?: number;
  upper?: number;
  rightmost?: boolean;
}
