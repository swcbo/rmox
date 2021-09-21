/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 08:06:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 15:14:45
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalProvider } from '../../src';

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root'),
);
