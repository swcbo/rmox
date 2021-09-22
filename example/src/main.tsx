/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 08:06:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 18:31:20
 */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalProvider } from '../../src/index';

ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  document.getElementById('root'),
);
