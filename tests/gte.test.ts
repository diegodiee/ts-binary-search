import {gte} from '../src/index.js';


test('gte', () => {
  const LIST_NUM = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  LIST_NUM.forEach((item, index) => {
    expect(gte(LIST_NUM, item)).toBe(index);
    expect(gte(LIST_NUM, item - 1)).toBe(index);
    expect(gte(LIST_NUM, item + 1)).toBe(index >= LIST_NUM.length - 1 ? -1 : (index + 1));
  });

  const LIST_STR = ['A', 'E', 'I', 'O', 'U'];
  expect(gte(LIST_STR, 'A')).toBe(0);
  expect(gte(LIST_STR, 'B')).toBe(1);
  expect(gte(LIST_STR, 'D')).toBe(1);
  expect(gte(LIST_STR, 'E')).toBe(1);
  expect(gte(LIST_STR, 'F')).toBe(2);
  expect(gte(LIST_STR, 'G')).toBe(2);
  expect(gte(LIST_STR, 'H')).toBe(2);
  expect(gte(LIST_STR, 'I')).toBe(2);
  expect(gte(LIST_STR, 'J')).toBe(3);
  expect(gte(LIST_STR, 'K')).toBe(3);
  expect(gte(LIST_STR, 'L')).toBe(3);
  expect(gte(LIST_STR, 'O')).toBe(3);
  expect(gte(LIST_STR, 'P')).toBe(4);
  expect(gte(LIST_STR, 'U')).toBe(4);
  expect(gte(LIST_STR, 'V')).toBe(-1);
  expect(gte(LIST_STR, 'Z')).toBe(-1);

  expect(gte(LIST_STR, 'FOO')).toBe(2);
  expect(gte(LIST_STR, 'foo')).toBe(-1);

  expect(gte(LIST_STR, 'a')).toBe(-1);
  expect(gte(LIST_STR, '0')).toBe(0);
});

test('gte: empty list', () => {
  expect(gte([], 0)).toBe(-1);
  expect(gte([], 9)).toBe(-1);
  expect(gte([], 1.2)).toBe(-1);
  expect(gte([], -1)).toBe(-1);
  expect(gte([], 'a')).toBe(-1);
  expect(gte([], 'z')).toBe(-1);
  expect(gte([], true)).toBe(-1);
  expect(gte([], false)).toBe(-1);
  expect(gte([], null)).toBe(-1);
  expect(gte([], undefined)).toBe(-1);
});

test('gte: repeated values', () => {
  const LIST_NUM = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  for (let i = 0; i < 5; i++) {
    expect(gte(LIST_NUM, 0)).toBe(0);
    expect(gte(LIST_NUM, 1)).toBe(1);
    expect(gte(LIST_NUM, 2)).toBe(1);
    expect(gte(LIST_NUM, 3)).toBe(5);
    expect(gte(LIST_NUM, 4)).toBe(5);
    expect(gte(LIST_NUM, 7)).toBe(5);

    expect(gte(LIST_NUM, 14)).toBe(8);
    expect(gte(LIST_NUM, 15)).toBe(13);

    expect(gte(LIST_NUM, 20)).toBe(15);
    expect(gte(LIST_NUM, 21)).toBe(-1);

    LIST_NUM.push(LIST_NUM[LIST_NUM.length - 1]);
  }
});

test('gte: options.lower', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(gte(L, 0, {lower: 0})).toBe(0);
  expect(gte(L, 0, {lower: 1})).toBe(1);
  expect(gte(L, 1, {lower: 1})).toBe(1);
  expect(gte(L, 1, {lower: 2})).toBe(2);
  expect(gte(L, 1, {lower: 3})).toBe(3);
  expect(gte(L, 1, {lower: 4})).toBe(4);
  expect(gte(L, 2, {lower: 5})).toBe(5);
});

test('gte: options.upper', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(gte(L, 3, {upper: 10})).toBe(5);
  expect(gte(L, 3, {upper: 5})).toBe(5);
  expect(gte(L, 2, {upper: 4})).toBe(1);
  expect(gte(L, 2, {upper: 3})).toBe(1);
  expect(gte(L, 2, {upper: 2})).toBe(1);
  expect(gte(L, 2, {upper: 1})).toBe(1);
  expect(gte(L, 1, {upper: 0})).toBe(-1);
});

test('gte: options.lower and options.upper', () => {
  const L = [0, 2, 2, 2, 2, 8, 10, 12, 14, 14, 14, 14, 14, 16, 18, 20, 20];

  expect(gte(L, 2, {lower: 1, upper: 8})).toBe(1);
  expect(gte(L, 3, {lower: 1, upper: 8})).toBe(5);
  expect(gte(L, 15, {lower: 2, upper: 8})).toBe(-1);

  expect(gte(L, 2, {lower: 1, upper: 5})).toBe(1);
  expect(gte(L, 2, {lower: 2, upper: 5})).toBe(2);
  expect(gte(L, 2, {lower: 3, upper: 5})).toBe(3);
  expect(gte(L, 2, {lower: 4, upper: 5})).toBe(4);
  expect(gte(L, 2, {lower: 5, upper: 5})).toBe(5);

  expect(gte(L, 2, {lower: 1, upper: 1})).toBe(1);
  expect(gte(L, 2, {lower: 2, upper: 2})).toBe(2);
  expect(gte(L, 2, {lower: 3, upper: 3})).toBe(3);
  expect(gte(L, 2, {lower: 4, upper: 4})).toBe(4);

  expect(gte(L, 2.0001, {lower: 4, upper: 4})).toBe(-1);
  expect(gte(L, 1.9999, {lower: 4, upper: 4})).toBe(4);
});

test('gte: options.compareFn (number)', () => {
  const L = [0, 1, 2, 2, 2, 3, 4, 5, 10, 10, 10, 10, 15];

  const cmp = (item: number, target: number): number => item - target;

  expect(gte(L, 0, {compareFn: cmp})).toBe(0);
  expect(gte(L, 1, {compareFn: cmp})).toBe(1);
  expect(gte(L, 2, {compareFn: cmp})).toBe(2);
  expect(gte(L, 5, {compareFn: cmp})).toBe(7);
  expect(gte(L, 7, {compareFn: cmp})).toBe(8);
  expect(gte(L, 10, {compareFn: cmp})).toBe(8);
  expect(gte(L, 16, {compareFn: cmp})).toBe(-1);
});

test('gte: options.compareFn (string)', () => {
  type TItem = {ch: string};
  const L: TItem[] = ['a', 'E', 'i', 'O', 'U'].map(n => ({ch: n}));

  const cmp = (item: TItem, target: string) => {
    const i = item.ch.toLowerCase();
    const t = target.toLowerCase();
    if (i > t)
      return 1;
    if (i < t)
      return -1;

    return 0;
  };

  expect(gte(L, 'a', {compareFn: cmp})).toBe(0);
  expect(gte(L, 'A', {compareFn: cmp})).toBe(0);
  expect(gte(L, 'F', {compareFn: cmp})).toBe(2);
  expect(gte(L, 'u', {compareFn: cmp})).toBe(4);
  expect(gte(L, 'z', {compareFn: cmp})).toBe(-1);

  expect(gte(L, '9', {compareFn: cmp})).toBe(0);
  expect(gte(L, 'FOO', {compareFn: cmp})).toBe(2);
  expect(gte(L, 'foo', {compareFn: cmp})).toBe(2);
});

test('gte: options.compareFn (object)', () => {
  type TItem = {value: number}
  const L: TItem[] = [0, 2, 2, 3, 3, 4, 5, 8, 9, 10, 10, 10, 10, 15].map(n => ({value: n}));

  const cmpA = (item: TItem, target: TItem): number => item.value - target.value;
  expect(gte(L, {value: 1}, {compareFn: cmpA})).toBe(1);
  expect(gte(L, {value: 2}, {compareFn: cmpA})).toBe(1);
  expect(gte(L, {value: 6}, {compareFn: cmpA})).toBe(7);
  expect(gte(L, {value: 8}, {compareFn: cmpA})).toBe(7);
  expect(gte(L, {value: 15}, {compareFn: cmpA})).toBe(13);
  expect(gte(L, {value: 16}, {compareFn: cmpA})).toBe(-1);

  const cmpB = (item: TItem, target: number): number => item.value - target;
  expect(gte(L, 1, {compareFn: cmpB})).toBe(1);
  expect(gte(L, 2, {compareFn: cmpB})).toBe(1);
  expect(gte(L, 6, {compareFn: cmpB})).toBe(7);
  expect(gte(L, 8, {compareFn: cmpB})).toBe(7);
  expect(gte(L, 15, {compareFn: cmpB})).toBe(13);
  expect(gte(L, 16, {compareFn: cmpB})).toBe(-1);
});
