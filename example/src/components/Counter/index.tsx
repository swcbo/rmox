import React, { memo } from 'react';
import useCounterModel from '../../models/useCounterModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:31:33
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 11:29:29
 */
const Counter = () => {
  const { del, add, setTest } = useCounterModel();
  console.log('Counter render', add);
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
      <button onClick={() => setTest((v) => v + 1)}>测试render</button>
    </>
  );
};
export default memo(Counter);
