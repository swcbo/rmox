import React from 'react';
import useMoneyModel from '../../models/useMoneyModel';
import { RmoxInstantce } from 'rmox';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 18:44:16
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-20 10:59:14
 */
const Todo = () => {
  const { money } = useMoneyModel();
  const { addMoney, addAge } = useMoneyModel();
  console.log(RmoxInstantce.store);
  return (
    <div>
      金额：{money} <button onClick={addMoney}>+</button>
      <button onClick={addAge}>添加年龄</button>
    </div>
  );
};

export default Todo;
