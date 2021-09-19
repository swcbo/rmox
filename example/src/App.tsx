/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 08:06:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 10:01:45
 */
import React, { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Count from './components/Counter/count';
import useCounter from './models/useCounter';

function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      {show && (
        <useCounter.Provider>
          <Counter />
          <Count />
        </useCounter.Provider>
      )}
      <button onClick={() => setShow(!show)}>点击显示隐藏</button>
    </div>
  );
}

export default App;
