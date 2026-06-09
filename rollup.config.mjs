import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default [
  // CJS + ESM bundles (JS only — styles compiled separately by scripts/build-css.js)
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main,   format: 'cjs', sourcemap: true, exports: 'named' },
      { file: pkg.module, format: 'esm', sourcemap: true, exports: 'named' },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx'],
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // Type declarations
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.scss$/, /\.css$/],
  },
];
