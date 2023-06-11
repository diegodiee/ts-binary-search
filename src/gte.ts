import {parse} from './options.js';

import type {TOptions} from './types.js';


export function gte<T, R>(list: T[], target: R, options?: TOptions<T, R>): number {
  if (list.length === 0)
    return -1;

  const {compareFn, lower, upper} = parse(list.length, options);

  let lo = lower;
  let hi = upper;

  let index = -1;

  while (lo <= hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);

    const x = compareFn(list[mid], target);
    if (x >= 0) {
      index = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return index;
}
