/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-17 21:04:00
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-18 13:59:52
 */
import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';
import packageJSON from './package.json';
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
  plugins: [resolve(), commonjs(), ts()],
  external: ['react'],

  output: [
    {
      file: 'lib/index.min.js', // 通用模块
      format: 'umd',
      ...outConfig,
    },
    {
      file: 'lib/index.esm.js', // 通用模块
      format: 'es',
      ...outConfig,
    },
    {
      file: 'lib/index.js', // 通用模块
      format: 'cjs',
      ...outConfig,
    },
  ],
};
