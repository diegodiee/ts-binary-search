import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';


const input = 'src/index.ts';

export default [
  // ESM + types
  {
    input,
    output: {
      file: `lib/index.js`,
      format: 'esm',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'lib/types',
      }),
    ],
  },

  // CJS
  {
    input,
    output: {
      file: `lib/index.cjs`,
      format: 'cjs',
    },
    plugins: [
      typescript({
        target: 'ES5',
      }),
    ],
  },

  // IIFE bundle
  {
    input,
    output: {
      file: `dist/ts-binary-search.min.js`,
      format: 'iife',
      name: 'binarySearch',
    },
    plugins: [
      typescript(),
      terser(),
    ],
  },

  // IIFE bundle (ES5)
  {
    input: input,
    output: {
      file: `dist/ts-binary-search.es5.min.js`,
      format: 'iife',
      name: 'binarySearch',
    },
    plugins: [
      typescript({
        target: 'ES5',
      }),
      terser(),
    ],
  },
];
