/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-21 10:01:08
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-23 22:18:54
 */
import { useState } from 'react';
import { createModel } from '../../../src/index';
import useMoneyModel from './useMoneyModel';

const useTestModel = () => {
  const { addAge } = useMoneyModel();
  const [test, setTest] = useState(0);
  const addTest = () => setTest((test) => test + 1);
  return { addTest, addAge, test };
};
export default createModel(useTestModel, { global: true });
