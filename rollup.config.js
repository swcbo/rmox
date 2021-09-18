/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-17 21:04:00
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-18 15:01:21
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
  plugins: [resolve(), commonjs(), ts({ useTsconfigDeclarationDir: true })],
  external: ['react', 'react/jsx-runtime'],
  output: [
    {
      file: 'lib/umd/index.min.js', // 通用模块
      format: 'umd',
      ...outConfig,
    },
    {
      file: 'lib/esm/index.esm.js', // 通用模块
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
