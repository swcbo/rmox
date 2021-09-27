/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-17 21:04:00
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-27 19:15:18
 */
import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';
import packageJSON from './package.json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
const outConfig = {
  sourcemap: true,
  name: packageJSON.name,
  globals: {
    react: 'react',
    'react/jsx-runtime': 'jsxRuntime',
  },
};
export default {
  input: 'src/index.ts',
  plugins: [
    sizeSnapshot(),
    uglify({ toplevel: true }),
    resolve(),
    commonjs(),
    ts({ useTsconfigDeclarationDir: true }),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
  ],
  external: ['react', 'react/jsx-runtime'],
  output: [
    {
      file: 'lib/umd/index.js', // 通用模块
      format: 'umd',
      ...outConfig,
    },
    {
      file: 'lib/esm/index.js', // 通用模块
      format: 'es',
      ...outConfig,
    },
    {
      file: 'lib/cjs/index.js', // 通用模块
      format: 'cjs',
      ...outConfig,
    },
  ],
};
