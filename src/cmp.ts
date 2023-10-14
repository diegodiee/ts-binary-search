import {parse} from './options.js';

import type {TOptions} from './types.js';


export function compare<T, R>(gt: boolean, strict: boolean, list: T[], target: R, options?: TOptions<T, R>) {
  if (list.length === 0)
    return -1;

  const {compareFn, lower, upper} = parse(list.length, options);

  let lo = lower;
  let hi = upper;

  let index = -1;

  while (lo <= hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);

    const x = compareFn(list[mid], target);
    if (gt) {
      if (x > 0 || (!strict && x === 0)) {
        index = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      if (x < 0 || (!strict && x === 0)) {
        index = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }

  return index;
}
