# ts-binary-search

> A TypeScript implementation of binary search algorithm for browsers and Node.js

A lightweight library that supports exact match, predecessor and successor queries on sorted arrays, based on the binary
search algorithm.

![npm](https://img.shields.io/npm/v/ts-binary-search)
![npm bundle size](https://img.shields.io/bundlephobia/min/ts-binary-search)
![npm](https://img.shields.io/npm/l/ts-binary-search)

## Install

```
npm install ts-binary-search
```

## Usage

#### ES modules

```javascript
import * as search from 'ts-binary-search';
// or
import {eq, ge, gte, lt, lte} from 'ts-binary-search';
```

#### CommonJS

```javascript
const search = require('ts-binary-search');
```

#### HTML

```jsx
<script src="https://cdn.jsdelivr.net/npm/ts-binary-search@1/dist/ts-binary-search.min.js"/>
// or
<script src="https://cdn.jsdelivr.net/npm/ts-binary-search@1/dist/ts-binary-search.es5.min.js"/>
```

## Examples

```typescript
import * as search from 'ts-binary-search';


const list = [3, 4, 7, 11, 14, 14, 14, 26, 26, 26, 26, 34];   // length: 12

search.eq(list, 1);                      // index: -1
search.eq(list, 7);                      // index: 2
search.eq(list, 14);                     // index: 4
search.eq(list, 14, {lower: 5});         // index: 5
search.eq(list, 14, {upper: 5});         // index: 4
search.eq(list, 26);                     // index: 7
search.eq(list, 26);                     // index: 7
search.eq(list, 26, {rightmost: true});  // index: 10

search.lt(list, 3);    // index: -1
search.lt(list, 7);    // index: 1
search.lte(list, 3);   // index: 0
search.lte(list, 15);  // index: 6

search.gt(list, 89);   // index: -1
search.gt(list, 4);    // index: 2
search.gte(list, 34);  // index: 11
search.gte(list, 20);  // index: 7

const vegetables100g = [
  {name: 'salad', kcal: 14},
  {name: 'tomato', kcal: 20},
  {name: 'carrot', kcal: 35, boiled: true},
  {name: 'carrot', kcal: 39},
  {name: 'garlic', kcal: 143},
  {name: 'lentils', kcal: 331},
];

const cmp = (item, target) => item.kcal - target;

search.gte(vegetables100g, 100, {compareFn: cmp});  // index: 4
search.gte(vegetables100g, 200, {compareFn: cmp});  // index: 5

search.lte(vegetables100g, 50, {compareFn: cmp});  // index: 3
search.lte(vegetables100g, 10, {compareFn: cmp});  // index: -1
```

*More examples [here](tests).*

## API

```
search.eq<T,R>(list: T[], target: R, options?: Options): number
```

Exact match query  
This returns the index of the matching item, or `-1` if not present.

```
search.gt<T,R>(list: T[], target: R, options?: Options): number

search.gte<T,R>(list: T[], target: R, options?: Options): number
```

Successor queries  
These return the index of the smallest item which is greater than (or equal to) `target`, or `-1`.  
In case of multiple matching items, they always return the **leftmost** one.

```
search.lt<T,R>(list: T[], target: R, options?: Options ): number

search.lte<T,R>(list: T[], target: R, options?: Options): number
```

Predecessor queries  
These return the index of the greatest item which is lower than (or equal to) `target`, or `-1`.  
In case of multiple matching items, they always return the **rightmost** one.

#### Options

```typescript
compareFn: (item: T, target: R) => number
```

A comparison function along the lines
of [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
method.  
It could be the same function you adopted for sorting the array.

| compareFn(item, target) return value |                 |
|:-------------------------------------|:----------------|
| \> 0                                 | item \> target  |
| \< 0                                 | item \< target  |
| === 0                                | item === target |

```typescript
lower: number     // default: 0
```

Lower bound (inclusive): do not search for items with index lower than this.

```typescript
upper: number     // default: list.length - 1
```

Upper bound (inclusive): do not search for items with index greater than this.

```typescript
rightmost: boolean  // default: false
```

*(used only by **search.eq**)*  
In case of multiple matching items, this allows you to take the rightmost or the leftmost one.

## License

MIT License  
© 2023 Diego Bogni  
