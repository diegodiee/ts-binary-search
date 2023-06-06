import {eq} from '../src';


test('eq', () => {
  const LIST_NUM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  LIST_NUM.forEach((item, index) => expect(eq(LIST_NUM, item)).toBe(index));

  const LIST_STR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  LIST_STR.forEach((item, index) => expect(eq(LIST_STR, item)).toBe(index));

  const LIST_1 = [2, 7];
  expect(eq(LIST_1, 1)).toBe(-1);
  expect(eq(LIST_1, 2)).toBe(0);
  expect(eq(LIST_1, 5)).toBe(-1);
  expect(eq(LIST_1, 7)).toBe(1);
  expect(eq(LIST_1, 8)).toBe(-1);

  const LIST_2 = [3];
  expect(eq(LIST_2, 2)).toBe(-1);
  expect(eq(LIST_2, 3)).toBe(0);
  expect(eq(LIST_2, 3.000001)).toBe(-1);
  expect(eq(LIST_2, 4)).toBe(-1);
});

test('eq: missing target', () => {
  const LIST_NUM = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

  for (let index = 1; index < LIST_NUM.length; index += 2) {
    expect(eq(LIST_NUM, index)).toBe(-1);
  }
  expect(eq(LIST_NUM, -1)).toBe(-1);
  expect(eq(LIST_NUM, 100)).toBe(-1);
  expect(eq(LIST_NUM, 1.3)).toBe(-1);

  const LIST_STR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  for (let index = 1; index < LIST_STR.length; index += 2) {
    expect(eq(LIST_STR, index)).toBe(-1);
  }
  expect(eq(LIST_STR, 'A')).toBe(-1);
  expect(eq(LIST_STR, 'z')).toBe(-1);
  expect(eq(LIST_STR, '.')).toBe(-1);
});

test('eq: empty list', () => {
  expect(eq([], 0)).toBe(-1);
  expect(eq([], 9)).toBe(-1);
  expect(eq([], 1.2)).toBe(-1);
  expect(eq([], -1)).toBe(-1);
  expect(eq([], 'a')).toBe(-1);
  expect(eq([], 'z')).toBe(-1);
  expect(eq([], true)).toBe(-1);
  expect(eq([], false)).toBe(-1);
  expect(eq([], null)).toBe(-1);
  expect(eq([], undefined)).toBe(-1);
});

test('eq: options.lower', () => {
  const L = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  expect(eq(L, 1, {lower: 1})).toBe(1);
  expect(eq(L, 5, {lower: 1})).toBe(5);
  expect(eq(L, 5, {lower: 4})).toBe(5);
  expect(eq(L, 12, {lower: 12})).toBe(12);

  expect(eq(L, 0, {lower: 1})).toBe(-1);
  expect(eq(L, 12, {lower: 13})).toBe(-1);
  expect(eq(L, 12, {lower: 16})).toBe(-1);
  expect(eq(L, 12, {lower: 20})).toBe(-1);
});

test('eq: options.upper', () => {
  const L = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  expect(eq(L, 5, {upper: 10})).toBe(5);
  expect(eq(L, 5, {upper: 7})).toBe(5);
  expect(eq(L, 10, {upper: 14})).toBe(10);
  expect(eq(L, 10, {upper: 10})).toBe(10);

  expect(eq(L, 10, {upper: 9})).toBe(-1);
  expect(eq(L, 15, {upper: 14})).toBe(-1);
  expect(eq(L, 15, {upper: 0})).toBe(-1);
  expect(eq(L, 15, {upper: -1})).toBe(-1);
});

test('eq: options.lower and options.upper', () => {
  const L = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  expect(eq(L, 11, {lower: 10, upper: 12})).toBe(11);
  expect(eq(L, 11, {lower: 10, upper: 11})).toBe(11);
  expect(eq(L, 11, {lower: 11, upper: 12})).toBe(11);
  expect(eq(L, 11, {lower: 11, upper: 11})).toBe(11);

  expect(eq(L, 11, {lower: 12, upper: 10})).toBe(11);
  expect(eq(L, 11, {lower: 11, upper: 10})).toBe(11);
  expect(eq(L, 11, {lower: 12, upper: 11})).toBe(11);
  expect(eq(L, 11, {lower: 11, upper: 11})).toBe(11);

  expect(eq(L, 11, {lower: 10, upper: L.length})).toBe(11);
  expect(eq(L, 11, {lower: 10, upper: L.length + 2})).toBe(11);
  expect(eq(L, 11, {lower: -1, upper: 12})).toBe(11);
  expect(eq(L, 11, {lower: -1, upper: 11})).toBe(11);
  expect(eq(L, 11, {lower: -1, upper: L.length + 2})).toBe(11);

  expect(eq(L, 15, {lower: 3, upper: L.length})).toBe(15);
  expect(eq(L, 15, {lower: 3, upper: L.length - 1})).toBe(15);

  expect(eq(L, 2, {lower: 3, upper: 9})).toBe(-1);
  expect(eq(L, 15, {lower: 3, upper: L.length - 2})).toBe(-1);
});

test('eq: options.rightmost = false (aka leftmost)', () => {
  const L = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
  const length = L.length;

  expect(eq(L, 0)).toBe(0);
  expect(eq(L, 1)).toBe(3);
  expect(eq(L, 2)).toBe(6);
  expect(eq(L, 3)).toBe(8);
  expect(eq(L, 4)).toBe(11);
  expect(eq(L, 5)).toBe(15);

  L.shift();
  expect(L.length).toBe(length - 1);
  expect(eq(L, 0)).toBe(0);

  L.shift();
  expect(L.length).toBe(length - 2);
  expect(eq(L, 0)).toBe(0);

  L.unshift(0, 0);
  expect(L.length).toBe(length);

  expect(eq(L, 0, {lower: 1})).toBe(1);
  expect(eq(L, 0, {lower: 2})).toBe(2);
  expect(eq(L, 0, {lower: 3})).toBe(-1);
  expect(eq(L, 2, {lower: 4})).toBe(6);
  expect(eq(L, 2, {upper: 6})).toBe(6);
  expect(eq(L, 2, {lower: 1, upper: 5})).toBe(-1);
});

test('eq: options.rightmost = true', () => {
  const L = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
  const length = L.length;

  expect(eq(L, 0, {rightmost: true})).toBe(2);
  expect(eq(L, 1, {rightmost: true})).toBe(5);
  expect(eq(L, 2, {rightmost: true})).toBe(7);
  expect(eq(L, 3, {rightmost: true})).toBe(10);
  expect(eq(L, 4, {rightmost: true})).toBe(14);
  expect(eq(L, 5, {rightmost: true})).toBe(length - 1);

  L.shift();
  expect(L.length).toBe(length - 1);

  expect(eq(L, 0, {rightmost: true})).toBe(1);
  expect(eq(L, 1, {rightmost: true})).toBe(4);
  expect(eq(L, 2, {rightmost: true})).toBe(6);
  expect(eq(L, 3, {rightmost: true})).toBe(9);
  expect(eq(L, 4, {rightmost: true})).toBe(13);
  expect(eq(L, 5, {rightmost: true})).toBe(length - 2);

  L.unshift(0);
  expect(L.length).toBe(length);

  expect(eq(L, 0, {lower: 1, rightmost: true})).toBe(2);
  expect(eq(L, 0, {lower: 2, rightmost: true})).toBe(2);
  expect(eq(L, 0, {lower: 3, rightmost: true})).toBe(-1);
  expect(eq(L, 3, {upper: 5, rightmost: true})).toBe(-1);
  expect(eq(L, 4, {lower: 6, upper: 18, rightmost: true})).toBe(14);
  expect(eq(L, 4, {lower: 6, upper: 15, rightmost: true})).toBe(14);
  expect(eq(L, 4, {lower: 6, upper: 14, rightmost: true})).toBe(14);
  expect(eq(L, 4, {lower: 6, upper: 13, rightmost: true})).toBe(13);
  expect(eq(L, 4, {lower: 6, upper: 12, rightmost: true})).toBe(12);
  expect(eq(L, 4, {lower: 6, upper: 11, rightmost: true})).toBe(11);
  expect(eq(L, 4, {lower: 6, upper: 10, rightmost: true})).toBe(-1);
});

test('eq: options.compareFn (number)', () => {
  const L = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const cmp = (item: number, target: number): number => item - target;

  L.forEach((item, i) => expect(eq(L, item, {compareFn: cmp})).toBe(i));

  expect(eq(L, 16, {compareFn: cmp})).toBe(-1);
});

test('eq: options.compareFn (string)', () => {
  type TItem = { ch: string };
  const L: TItem[] = ['a', 'b', 'C', 'D', 'e', 'F', 'g', 'H', 'i'].map(n => ({ch: n}));

  const cmp = (item: TItem, target: string) => {
    const i = item.ch.toLowerCase();
    const t = target.toLowerCase();
    if (i > t)
      return 1;
    if (i < t)
      return -1;

    return 0;
  };

  L.forEach((item, i) => expect(eq(L, item.ch, {compareFn: cmp})).toBe(i));

  expect(eq(L, 'K', {compareFn: cmp})).toBe(-1);
  expect(eq(L, 'aa', {compareFn: cmp})).toBe(-1);
  expect(eq(L, 'AA', {compareFn: cmp})).toBe(-1);
});

test('eq: options.compareFn (object)', () => {
  type TItem = { value: number }
  const L: TItem[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => ({value: n}));

  const cmpA = (item: TItem, target: TItem): number => {
    if (target.value < item.value)
      return 1;
    if (target.value > item.value)
      return -1;

    return 0;
  };
  L.forEach((item, i) => expect(eq(L, item, {compareFn: cmpA})).toBe(i));

  const cmpB = (item: TItem, target: number): number => {
    if (target < item.value)
      return 1;
    if (target > item.value)
      return -1;

    return 0;
  };
  L.forEach((item, i) => expect(eq(L, item.value, {compareFn: cmpB})).toBe(i));
});

test('eq: peculiar cases', () => {
  const L1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const L2 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  expect(eq(L1, null)).toBe(-1);
  expect(eq(L2, null)).toBe(-1);

  expect(eq(L1, undefined)).toBe(-1);
  expect(eq(L2, undefined)).toBe(-1);

  expect(eq(L1, '3')).toBe(-1);
  expect(eq(L2, 3)).toBe(-1);
});
