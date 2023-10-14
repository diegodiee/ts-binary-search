import {compare} from './cmp.js';

import type {TOptions} from './types.js';


export function gt<T, R>(list: T[], target: R, options?: TOptions<T, R>) {
  return compare(true, true, list, target, options);
}

export function gte<T, R>(list: T[], target: R, options?: TOptions<T, R>) {
  return compare(true, false, list, target, options);
}

export function lt<T, R>(list: T[], target: R, options?: TOptions<T, R>) {
  return compare(false, true, list, target, options);
}

export function lte<T, R>(list: T[], target: R, options?: TOptions<T, R>) {
  return compare(false, false, list, target, options);
}

export {eq} from './eq.js';
