// resolve将我们编写的源码与依赖的第三方库进行合并
import resolve from '@rollup/plugin-node-resolve'
// 解决rollup.js无法识别CommonJS模块
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const override = { compilerOptions: { declaration: false } } // 设置生成相应的 .d.ts' file.
const extensions = ['.ts']
const babelRuntimeVersion = pkg.devDependencies['@babel/runtime'].replace(/^[^0-9]*/, '')

export default [
  // umd
  {
    input: 'src/deploy.ts',
    // external: [],
    output: {
      name: 'wxNotifyServer',
      file: 'dist/build.js',
      format: 'umd',
      //   indent: false,
    },
    plugins: [
      resolve({ extensions }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript({ tsconfigOverride: override }), // 会合并 tsconfig的配置
      babel({
        extensions,
        exclude: 'node_modules/**',
        skipPreflightCheck: true,
        babelHelpers: 'bundled',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
  // commonjs
  {
    input: 'src/deploy.ts',
    external: [],
    output: {
      file: pkg.main,
      format: 'cjs',
      indent: false,
      // exports: 'default',
    },
    plugins: [
      commonjs(),
      resolve({
        extensions,
      }),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        extensions,
        plugins: [['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }]],
        babelHelpers: 'runtime',
      }),
    ],
  },
]
