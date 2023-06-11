import {parse} from '../src/options.js';


test('parse - default', () => {
  const parsed = parse(10);

  expect(parsed).toHaveProperty('compareFn');
  expect(parsed).toHaveProperty('lower', 0);
  expect(parsed).toHaveProperty('upper', 9);
  expect(parsed).toHaveProperty('rightmost', false);
});

test('parse - `lower` is integer in range [0, length - 1]', () => {
  expect(parse(10, {lower: 0})).toHaveProperty('lower', 0);
  expect(parse(10, {lower: 1})).toHaveProperty('lower', 1);
  expect(parse(10, {lower: 9})).toHaveProperty('lower', 9);
  expect(parse(10, {lower: 10})).toHaveProperty('lower', 9);

  expect(parse(10, {lower: -1})).toHaveProperty('lower', 0);
  expect(parse(10, {lower: -0.01})).toHaveProperty('lower', 0);
  expect(parse(10, {lower: -100})).toHaveProperty('lower', 0);

  expect(parse(10, {lower: 100})).toHaveProperty('lower', 9);

  expect(parse(10, {lower: 0.5})).toHaveProperty('lower', 0);
  expect(parse(10, {lower: 2.34})).toHaveProperty('lower', 2);
  expect(parse(10, {lower: Math.PI})).toHaveProperty('lower', 3);
});

test('parse - `upper` is integer in range [0, length - 1]', () => {
  expect(parse(10, {upper: 0})).toHaveProperty('upper', 0);
  expect(parse(10, {upper: 1})).toHaveProperty('upper', 1);
  expect(parse(10, {upper: 9})).toHaveProperty('upper', 9);
  expect(parse(10, {upper: 10})).toHaveProperty('upper', 9);

  expect(parse(10, {upper: -1})).toHaveProperty('upper', 0);
  expect(parse(10, {upper: -0.01})).toHaveProperty('upper', 0);
  expect(parse(10, {upper: -100})).toHaveProperty('upper', 0);

  expect(parse(10, {upper: 100})).toHaveProperty('upper', 9);

  expect(parse(10, {upper: 0.5})).toHaveProperty('upper', 0);
  expect(parse(10, {upper: 2.34})).toHaveProperty('upper', 2);
  expect(parse(10, {upper: Math.PI})).toHaveProperty('upper', 3);
});

test('parse - `lower` is <= `upper`', () => {
  const options1 = parse(10, {lower: 5, upper: 1});
  expect(options1).toHaveProperty('lower', 1);
  expect(options1).toHaveProperty('upper', 5);

  const options2 = parse(10, {lower: 5.5, upper: 1.9});
  expect(options2).toHaveProperty('lower', 1);
  expect(options2).toHaveProperty('upper', 5);

  const options3 = parse(10, {lower: 11, upper: 2});
  expect(options3).toHaveProperty('lower', 2);
  expect(options3).toHaveProperty('upper', 9);

  const options4 = parse(10, {lower: 2, upper: -1});
  expect(options4).toHaveProperty('lower', 0);
  expect(options4).toHaveProperty('upper', 2);

  const options5 = parse(10, {lower: 20, upper: 22});
  expect(options5).toHaveProperty('lower', 9);
  expect(options5).toHaveProperty('upper', 9);

  const options6 = parse(10, {lower: -4, upper: -1});
  expect(options6).toHaveProperty('lower', 0);
  expect(options6).toHaveProperty('upper', 0);

  const options7 = parse(10, {lower: 0, upper: 0});
  expect(options7).toHaveProperty('lower', 0);
  expect(options7).toHaveProperty('upper', 0);
});

test('parse - `rightmost`', () => {
  expect(parse(10)).toHaveProperty('rightmost', false);
  expect(parse(10, {rightmost: false})).toHaveProperty('rightmost', false);
  expect(parse(10, {rightmost: true})).toHaveProperty('rightmost', true);

  expect(parse(10, {lower: 5, upper: 1})).toHaveProperty('rightmost', false);
  expect(parse(10, {lower: 5, upper: 1, rightmost: false})).toHaveProperty('rightmost', false);
  expect(parse(10, {lower: 5, upper: 1, rightmost: true})).toHaveProperty('rightmost', true);
});
