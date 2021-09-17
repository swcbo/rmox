import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2';
import packageJSON from './package.json';
// 基础配置
const commonConf = {
  input: 'src/index.ts',
  plugins: [resolve(), commonjs(), ts()],
};
// 需要导出的模块类型
const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'umd',
  },
  {
    file: packageJSON.module, // es6模块
    format: 'es',
  },
];

const buildConf = (options) => Object.assign({}, commonConf, options);

export default outputMap.map((output) =>
  buildConf({ output: { name: packageJSON.name, ...output } }),
);
