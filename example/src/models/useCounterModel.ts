import { useRef } from 'react';
/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 19:17:44
 */
import { useCallback, useState } from 'react';
import { createModel } from '../../../src/index';
import useUserModel from './useUserModel';
const useCounterModel = (init?: number) => {
  const { addAge } = useUserModel();
  const ces = useRef(0);
  const [count, setCount] = useState(init || 1);
  const [test, setTest] = useState(1);
  const del = useCallback(() => setCount((count) => count - 1), []);
  const add = useCallback(() => setCount(count + 1), [count]);
  console.log(count);
  return {
    count,
    ces,
    add,
    del,
    setTest,
    test,
  };
};
export default createModel(useCounterModel);
