/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 11:29:40
 */
import { useState } from 'react';
import { createModel } from '../../../src/index';
import useUserModel from './useUserModel';
const useCounterModel = (init?: number) => {
  const { addAge } = useUserModel();
  const [count, setCount] = useState(init || 1);
  const [test, setTest] = useState(1);
  const del = () => setCount((count) => count - 1);
  const add = () => setCount(count + 1);
  console.log(count);
  return {
    count,
    add,
    del,
    setTest,
    test,
  };
};
export default createModel(useCounterModel);
