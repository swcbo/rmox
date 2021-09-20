import { useState } from 'react';
import { createModel } from 'rmox';
import useUserModel from './useUserModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 16:27:15
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-20 11:00:01
 */
const useMoneyModel = () => {
  const [money, setMoney] = useState(100);
  const { addAge } = useUserModel();
  const addMoney = () => setMoney((money) => money + 1);
  return { addMoney, money, addAge };
};
export default createModel(useMoneyModel, 'money', true);
