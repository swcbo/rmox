import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';
import packageJSON from './package.json';
export default {
  input: 'src/index.ts',
  plugins: [resolve(), commonjs(), ts()],
  external: ['react'],
  output: [
    {
      file: 'lib/index.js', // 通用模块
      format: 'umd',
      sourcemap: true,
      name: packageJSON.name,
    },
    {
      file: 'lib/index.esm.js', // 通用模块
      format: 'es',
      sourcemap: true,
      name: packageJSON.name,
    },
  ],
};
