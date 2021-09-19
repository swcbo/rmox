import React from 'react';
import useCounter from '../../models/useCounter';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:31:33
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 18:57:25
 */
const Counter = () => {
  const { del, add } = useCounter();
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
    </>
  );
};
export default Counter;
