import {gt} from '../src';


test('gt', () => {
  const LIST_NUM = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  LIST_NUM.forEach((item, index) => {
    expect(gt(LIST_NUM, item - 1)).toBe(index);
    expect(gt(LIST_NUM, item)).toBe(index >= LIST_NUM.length - 1 ? -1 : (index + 1));
  });

  const LIST_STR = ['A', 'E', 'I', 'O', 'U'];
  expect(gt(LIST_STR, 'A')).toBe(1);
  expect(gt(LIST_STR, 'B')).toBe(1);
  expect(gt(LIST_STR, 'D')).toBe(1);
  expect(gt(LIST_STR, 'E')).toBe(2);
  expect(gt(LIST_STR, 'F')).toBe(2);
  expect(gt(LIST_STR, 'G')).toBe(2);
  expect(gt(LIST_STR, 'H')).toBe(2);
  expect(gt(LIST_STR, 'I')).toBe(3);
  expect(gt(LIST_STR, 'J')).toBe(3);
  expect(gt(LIST_STR, 'K')).toBe(3);
  expect(gt(LIST_STR, 'L')).toBe(3);
  expect(gt(LIST_STR, 'O')).toBe(4);
  expect(gt(LIST_STR, 'P')).toBe(4);
  expect(gt(LIST_STR, 'U')).toBe(-1);
  expect(gt(LIST_STR, 'V')).toBe(-1);
  expect(gt(LIST_STR, 'Z')).toBe(-1);

  expect(gt(LIST_STR, 'FOO')).toBe(2);
  expect(gt(LIST_STR, 'foo')).toBe(-1);

  expect(gt(LIST_STR, 'a')).toBe(-1);
  expect(gt(LIST_STR, '0')).toBe(0);
});

test('gt: empty list', () => {
  expect(gt([], 0)).toBe(-1);
  expect(gt([], 9)).toBe(-1);
  expect(gt([], 1.2)).toBe(-1);
  expect(gt([], -1)).toBe(-1);
  expect(gt([], 'a')).toBe(-1);
  expect(gt([], 'z')).toBe(-1);
  expect(gt([], true)).toBe(-1);
  expect(gt([], false)).toBe(-1);
  expect(gt([], null)).toBe(-1);
  expect(gt([], undefined)).toBe(-1);
});

test('gt: repeated values', () => {
  const LIST_NUM = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  for (let i = 0; i < 5; i++) {
    expect(gt(LIST_NUM, 0)).toBe(1);
    expect(gt(LIST_NUM, 1)).toBe(1);
    expect(gt(LIST_NUM, 1.5)).toBe(1);
    expect(gt(LIST_NUM, 2)).toBe(5);
    expect(gt(LIST_NUM, 3)).toBe(5);
    expect(gt(LIST_NUM, 7)).toBe(5);

    expect(gt(LIST_NUM, 13)).toBe(8);
    expect(gt(LIST_NUM, 14)).toBe(13);

    expect(gt(LIST_NUM, 20)).toBe(-1);
    expect(gt(LIST_NUM, -1)).toBe(0);

    LIST_NUM.push(LIST_NUM[LIST_NUM.length - 1]);
  }
});

test('gt: options.lower', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(gt(L, 0, {lower: 1})).toBe(1);
  expect(gt(L, 1, {lower: 1})).toBe(1);
  expect(gt(L, 1, {lower: 2})).toBe(2);
  expect(gt(L, 1, {lower: 3})).toBe(3);
  expect(gt(L, 1, {lower: 4})).toBe(4);
  expect(gt(L, 2, {lower: 4})).toBe(5);
  expect(gt(L, 2, {lower: 5})).toBe(5);
});

test('gt: options.upper', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(gt(L, 3, {upper: 10})).toBe(5);
  expect(gt(L, 3, {upper: 5})).toBe(5);
  expect(gt(L, 1, {upper: 4})).toBe(1);
  expect(gt(L, 1, {upper: 3})).toBe(1);
  expect(gt(L, 1, {upper: 2})).toBe(1);
  expect(gt(L, 1, {upper: 1})).toBe(1);
  expect(gt(L, 1, {upper: 0})).toBe(-1);
});

test('gt: options.lower and options.upper', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(gt(L, 1, {lower: 1, upper: 8})).toBe(1);
  expect(gt(L, 2, {lower: 1, upper: 8})).toBe(5);
  expect(gt(L, 14, {lower: 1, upper: 8})).toBe(-1);

  expect(gt(L, 1, {lower: 1, upper: 5})).toBe(1);
  expect(gt(L, 1, {lower: 2, upper: 5})).toBe(2);
  expect(gt(L, 1, {lower: 3, upper: 5})).toBe(3);
  expect(gt(L, 1, {lower: 4, upper: 5})).toBe(4);
  expect(gt(L, 1, {lower: 5, upper: 5})).toBe(5);

  expect(gt(L, 1, {lower: 1, upper: 1})).toBe(1);
  expect(gt(L, 1, {lower: 2, upper: 2})).toBe(2);
  expect(gt(L, 1, {lower: 3, upper: 3})).toBe(3);
  expect(gt(L, 1, {lower: 4, upper: 4})).toBe(4);

  expect(gt(L, 2, {lower: 4, upper: 4})).toBe(-1);
  expect(gt(L, 1.9999, {lower: 4, upper: 4})).toBe(4);
});

test('gt: options.compareFn (number)', () => {
  const L = [0, 1, 2, 2, 2, 3, 4, 5, 10, 10, 10, 10, 15];

  const cmp = (item: number, target: number): number => item - target;

  expect(gt(L, 1, {compareFn: cmp})).toBe(2);
  expect(gt(L, 2, {compareFn: cmp})).toBe(5);
  expect(gt(L, 5, {compareFn: cmp})).toBe(8);
  expect(gt(L, 9, {compareFn: cmp})).toBe(8);
  expect(gt(L, 10, {compareFn: cmp})).toBe(12);
  expect(gt(L, 15, {compareFn: cmp})).toBe(-1);
});

test('gt: options.compareFn (string)', () => {
  type TItem = { ch: string };
  const L: TItem[] = ['A', 'e', 'i', 'O', 'U'].map(n => ({ch: n}));

  const cmp = (item: TItem, target: string) => {
    const i = item.ch.toLowerCase();
    const t = target.toLowerCase();
    if (i > t)
      return 1;
    if (i < t)
      return -1;

    return 0;
  };

  expect(gt(L, 'a', {compareFn: cmp})).toBe(1);
  expect(gt(L, 'A', {compareFn: cmp})).toBe(1);
  expect(gt(L, 'F', {compareFn: cmp})).toBe(2);
  expect(gt(L, 'u', {compareFn: cmp})).toBe(-1);
  expect(gt(L, 'z', {compareFn: cmp})).toBe(-1);

  expect(gt(L, '9', {compareFn: cmp})).toBe(0);
  expect(gt(L, 'FOO', {compareFn: cmp})).toBe(2);
  expect(gt(L, 'foo', {compareFn: cmp})).toBe(2);
});

test('gt: options.compareFn (object)', () => {
  type TItem = { value: number }
  const L: TItem[] = [0, 2, 2, 3, 3, 4, 5, 8, 9, 10, 10, 10, 10, 15].map(n => ({value: n}));

  const cmpA = (item: TItem, target: TItem): number => item.value - target.value;
  expect(gt(L, {value: 1}, {compareFn: cmpA})).toBe(1);
  expect(gt(L, {value: 2}, {compareFn: cmpA})).toBe(3);
  expect(gt(L, {value: 5}, {compareFn: cmpA})).toBe(7);
  expect(gt(L, {value: 7}, {compareFn: cmpA})).toBe(7);
  expect(gt(L, {value: 8}, {compareFn: cmpA})).toBe(8);
  expect(gt(L, {value: 15}, {compareFn: cmpA})).toBe(-1);

  const cmpB = (item: TItem, target: number): number => item.value - target;
  expect(gt(L, 1, {compareFn: cmpB})).toBe(1);
  expect(gt(L, 2, {compareFn: cmpB})).toBe(3);
  expect(gt(L, 5, {compareFn: cmpB})).toBe(7);
  expect(gt(L, 7, {compareFn: cmpB})).toBe(7);
  expect(gt(L, 8, {compareFn: cmpB})).toBe(8);
  expect(gt(L, 15, {compareFn: cmpB})).toBe(-1);
});
