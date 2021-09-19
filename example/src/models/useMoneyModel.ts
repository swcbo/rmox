import { useState } from 'react';
import { createModel } from 'rmox';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 16:27:15
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 20:50:20
 */
const useMoneyModel = () => {
  const [money, setMoney] = useState(100);
  const addMoney = () => setMoney((money) => money + 1);
  return { addMoney, money };
};
export default createModel(useMoneyModel, 'money', true);
