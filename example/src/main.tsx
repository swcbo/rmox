/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 08:06:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 19:20:06
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalProvider } from '../../src/index';
import App from './App';
import './index.css';

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root'),
);
