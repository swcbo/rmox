import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';
import packageJSON from './package.json';
// 基础配置
const commonConf = {
  input: 'src/index.ts',
  plugins: [resolve(), commonjs(), ts()],
  external: ['react'],
};
// 需要导出的模块类型
const outputMap = [
  {
    file: 'lib/index.min.js', // 通用模块
    format: 'umd',
    sourcemap: true,
    name: 'Rmox',
  },
  {
    file: 'lib/index.esm.js', // 通用模块
    format: 'es',
    sourcemap: true,
    name: 'Rmox',
  },
  {
    file: 'lib/index.js', // 通用模块
    format: 'cjs',
    sourcemap: true,
    name: 'Rmox',
  },
];

const buildConf = (options) => Object.assign({}, commonConf, options);

export default outputMap.map((output) =>
  buildConf({ output: { name: packageJSON.name, ...output } }),
);
