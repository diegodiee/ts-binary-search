import type {TOptions} from './types.js';


function compareFnDefault<T, R>(item: T, target: R): number {
  if (typeof target !== typeof item)
    return -1;

  if ((target as unknown as T) < item)
    return 1;
  if ((target as unknown as T) > item)
    return -1;

  return 0;
}

export function parse<T, R>(length: number, options?: TOptions<T, R>): Required<TOptions<T, R>> {
  const max = Math.floor(length - 1);
  const lo = Math.floor(Math.min(options?.lower ?? 0, options?.upper ?? max));
  const hi = Math.floor(Math.max(options?.lower ?? 0, options?.upper ?? max));

  const lower = Math.max(0, Math.min(lo, max));
  const upper = Math.min(Math.max(0, hi), max);

  return {
    compareFn: options?.compareFn ?? compareFnDefault,
    lower,
    upper,
    rightmost: options?.rightmost ?? false,
  };
}
