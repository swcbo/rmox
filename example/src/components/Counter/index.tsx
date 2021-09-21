import React from 'react';
import useCounterModel from '../../models/useCounterModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:31:33
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-20 23:28:10
 */
const Counter = () => {
  const { del, add, setTest } = useCounterModel();
  console.log('Counter render');
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
      <button onClick={() => setTest((v) => v + 1)}>测试render</button>
    </>
  );
};
export default Counter;
