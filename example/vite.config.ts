/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 08:06:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-26 23:35:12
 */
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    reactRefresh(),
    babel({
      extensions: ['.jsx', '.tsx'],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    }),
  ],
  // esbuild: {
  // jsxInject: `import React from 'react'`,
  // },
});
