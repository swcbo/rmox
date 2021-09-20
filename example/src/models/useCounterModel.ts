/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-20 11:00:48
 */
import { useState } from 'react';
import { createModel } from 'rmox';
const useCounterModel = () => {
  const [count, setCount] = useState(4);
  const [test, setTest] = useState(1);
  const del = () => setCount(count - 1);
  const add = () => setCount(count + 1);
  return {
    count,
    add,
    del,
    setTest,
    test,
  };
};
export default createModel(useCounterModel, 'counter');