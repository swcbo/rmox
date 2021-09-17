const path = require('path');
const resolve = (_path) => path.resolve(__dirname, _path);
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser', // 配置ts解析器
  parserOptions: {
    project: resolve('./tsconfig.json'),
    tsconfigRootDir: resolve('./'),
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
