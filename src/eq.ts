import {parse} from './options.js';

import type {TOptions} from './types.js';


export function eq<T, R>(list: T[], target: R, options?: TOptions<T, R>): number {
  if (list.length === 0)
    return -1;

  const {compareFn, lower, upper, rightmost} = parse(list.length, options);

  let lo = lower;
  let hi = upper;

  let index = -1;

  while (lo <= hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);

    const x = compareFn(list[mid], target);
    if (x < 0) {
      lo = mid + 1;
    } else if (x > 0) {
      hi = mid - 1;
    } else {
      index = mid;
      if (rightmost)
        lo = mid + 1;
      else
        hi = mid - 1;
    }
  }

  return index;
}
