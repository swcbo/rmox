import { useState } from 'react';
import { createModel } from '../../../src/index';
import useMoneyModel from './useMoneyModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 16:27:15
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 10:04:37
 */
const useTestModel = () => {
  const { addAge } = useMoneyModel();
  const [test, setTest] = useState(0);
  const addTest = () => setTest((test) => test + 1);
  console.log(addAge, 'useTestModel');
  return { addTest };
};
export default createModel(useTestModel, true);
