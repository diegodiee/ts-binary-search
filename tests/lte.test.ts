import {lte} from '../src/index.js';


test('lte', () => {
  const LIST_NUM = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  LIST_NUM.forEach((item, index) => {
    expect(lte(LIST_NUM, item)).toBe(index);
    expect(lte(LIST_NUM, item + 1)).toBe(index);
    expect(lte(LIST_NUM, item - 1)).toBe(index - 1);
  });

  const LIST_STR = ['A', 'E', 'I', 'O', 'U'];
  expect(lte(LIST_STR, 'A')).toBe(0);
  expect(lte(LIST_STR, 'B')).toBe(0);
  expect(lte(LIST_STR, 'D')).toBe(0);
  expect(lte(LIST_STR, 'E')).toBe(1);
  expect(lte(LIST_STR, 'F')).toBe(1);
  expect(lte(LIST_STR, 'G')).toBe(1);
  expect(lte(LIST_STR, 'H')).toBe(1);
  expect(lte(LIST_STR, 'I')).toBe(2);
  expect(lte(LIST_STR, 'J')).toBe(2);
  expect(lte(LIST_STR, 'K')).toBe(2);
  expect(lte(LIST_STR, 'L')).toBe(2);
  expect(lte(LIST_STR, 'O')).toBe(3);
  expect(lte(LIST_STR, 'P')).toBe(3);
  expect(lte(LIST_STR, 'U')).toBe(4);
  expect(lte(LIST_STR, 'V')).toBe(4);
  expect(lte(LIST_STR, 'Z')).toBe(4);

  expect(lte(LIST_STR, 'FOO')).toBe(1);
  expect(lte(LIST_STR, 'foo')).toBe(4);

  expect(lte(LIST_STR, 'a')).toBe(4);
  expect(lte(LIST_STR, '0')).toBe(-1);
});

test('lte: empty list', () => {
  expect(lte([], 0)).toBe(-1);
  expect(lte([], 9)).toBe(-1);
  expect(lte([], 1.2)).toBe(-1);
  expect(lte([], -1)).toBe(-1);
  expect(lte([], 'a')).toBe(-1);
  expect(lte([], 'z')).toBe(-1);
  expect(lte([], true)).toBe(-1);
  expect(lte([], false)).toBe(-1);
  expect(lte([], null)).toBe(-1);
  expect(lte([], undefined)).toBe(-1);
});

test('lte: repeated values', () => {
  const LIST_NUM = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  for (let i = 0; i < 5; i++) {
    expect(lte(LIST_NUM, 2)).toBe(4);
    expect(lte(LIST_NUM, 3)).toBe(4);
    expect(lte(LIST_NUM, 4)).toBe(4);
    expect(lte(LIST_NUM, 5)).toBe(4);
    expect(lte(LIST_NUM, 6)).toBe(4);
    expect(lte(LIST_NUM, 7)).toBe(4);

    expect(lte(LIST_NUM, 14)).toBe(12);
    expect(lte(LIST_NUM, 15)).toBe(12);

    expect(lte(LIST_NUM, 20)).toBe(LIST_NUM.length - 1);
    expect(lte(LIST_NUM, 21)).toBe(LIST_NUM.length - 1);

    LIST_NUM.push(LIST_NUM[LIST_NUM.length - 1]);
  }
});

test('lte: options.lower', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(lte(L, 1, {lower: 1})).toBe(-1);
  expect(lte(L, 2, {lower: 1})).toBe(4);
  expect(lte(L, 3, {lower: 1})).toBe(4);
  expect(lte(L, 5, {lower: 4})).toBe(4);
});

test('lte: options.upper', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(lte(L, 3, {upper: 10})).toBe(4);
  expect(lte(L, 2, {upper: 4})).toBe(4);
  expect(lte(L, 3, {upper: 4})).toBe(4);
  expect(lte(L, 2, {upper: 3})).toBe(3);
  expect(lte(L, 2, {upper: 2})).toBe(2);
  expect(lte(L, 2, {upper: 1})).toBe(1);
  expect(lte(L, 2, {upper: 0})).toBe(0);
});

test('lte: options.lower and options.upper', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(lte(L, 2, {lower: 1, upper: 8})).toBe(4);
  expect(lte(L, 3, {lower: 1, upper: 8})).toBe(4);
  expect(lte(L, 7, {lower: 2, upper: 8})).toBe(4);

  expect(lte(L, 14, {lower: 8, upper: 14})).toBe(12);
  expect(lte(L, 14, {lower: 8, upper: 13})).toBe(12);
  expect(lte(L, 14, {lower: 8, upper: 12})).toBe(12);
  expect(lte(L, 14, {lower: 8, upper: 11})).toBe(11);
  expect(lte(L, 14, {lower: 8, upper: 10})).toBe(10);
  expect(lte(L, 14, {lower: 8, upper: 9})).toBe(9);

  expect(lte(L, 14, {lower: 8, upper: 8})).toBe(8);
  expect(lte(L, 14, {lower: 9, upper: 9})).toBe(9);
  expect(lte(L, 14, {lower: 10, upper: 10})).toBe(10);
  expect(lte(L, 14, {lower: 11, upper: 11})).toBe(11);
  expect(lte(L, 14, {lower: 12, upper: 12})).toBe(12);

  expect(lte(L, 13.9999, {lower: 12, upper: 12})).toBe(-1);
  expect(lte(L, 14.0001, {lower: 12, upper: 12})).toBe(12);
});

test('lte: options.compareFn (number)', () => {
  const L = [0, 1, 2, 2, 2, 3, 4, 5, 8, 9, 10, 10, 10, 10, 15];

  const cmp = (item: number, target: number): number => item - target;

  expect(lte(L, 2, {compareFn: cmp})).toBe(4);
  expect(lte(L, 5, {compareFn: cmp})).toBe(7);
  expect(lte(L, 7, {compareFn: cmp})).toBe(7);
  expect(lte(L, 8, {compareFn: cmp})).toBe(8);
  expect(lte(L, 15, {compareFn: cmp})).toBe(14);
});

test('lte: options.compareFn (string)', () => {
  type TItem = {ch: string};
  const L: TItem[] = ['a', 'e', 'I', 'o', 'U'].map(n => ({ch: n}));

  const cmp = (item: TItem, target: string) => {
    const i = item.ch.toLowerCase();
    const t = target.toLowerCase();
    if (i > t)
      return 1;
    if (i < t)
      return -1;

    return 0;
  };

  expect(lte(L, 'a', {compareFn: cmp})).toBe(0);
  expect(lte(L, 'A', {compareFn: cmp})).toBe(0);
  expect(lte(L, 'F', {compareFn: cmp})).toBe(1);
  expect(lte(L, 'L', {compareFn: cmp})).toBe(2);
  expect(lte(L, 'o', {compareFn: cmp})).toBe(3);
  expect(lte(L, 'z', {compareFn: cmp})).toBe(4);

  expect(lte(L, '9', {compareFn: cmp})).toBe(-1);
  expect(lte(L, 'FOO', {compareFn: cmp})).toBe(1);
  expect(lte(L, 'foo', {compareFn: cmp})).toBe(1);
});

test('lte: options.compareFn (object)', () => {
  type TItem = {value: number}
  const L: TItem[] = [0, 1, 2, 2, 2, 3, 4, 5, 8, 9, 10, 10, 10, 10, 15].map(n => ({value: n}));

  const cmpA = (item: TItem, target: TItem): number => item.value - target.value;
  expect(lte(L, {value: -1}, {compareFn: cmpA})).toBe(-1);
  expect(lte(L, {value: 2}, {compareFn: cmpA})).toBe(4);
  expect(lte(L, {value: 5}, {compareFn: cmpA})).toBe(7);
  expect(lte(L, {value: 7}, {compareFn: cmpA})).toBe(7);
  expect(lte(L, {value: 8}, {compareFn: cmpA})).toBe(8);
  expect(lte(L, {value: 15}, {compareFn: cmpA})).toBe(14);

  const cmpB = (item: TItem, target: number): number => item.value - target;
  expect(lte(L, -1, {compareFn: cmpB})).toBe(-1);
  expect(lte(L, 2.5, {compareFn: cmpB})).toBe(4);
  expect(lte(L, 5, {compareFn: cmpB})).toBe(7);
  expect(lte(L, 6, {compareFn: cmpB})).toBe(7);
  expect(lte(L, 8, {compareFn: cmpB})).toBe(8);
  expect(lte(L, 15, {compareFn: cmpB})).toBe(14);
});
