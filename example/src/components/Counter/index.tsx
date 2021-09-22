import React, { memo } from 'react';
import useCounterModel from '../../models/useCounterModel';
import Test from './test';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:31:33
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 19:18:19
 */
const Counter = () => {
  const { del, add } = useCounterModel();
  console.log('Counter render');
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
      <Test />
    </>
  );
};
export default memo(Counter);
