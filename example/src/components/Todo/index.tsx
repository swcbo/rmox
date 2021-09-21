import React, { memo } from 'react';
import useMoneyModel from '../../models/useMoneyModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 18:44:16
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 10:09:41
 */
const Todo = () => {
  const { money, addMoney, addAge } = useMoneyModel();
  return (
    <div>
      金额：{money} <button onClick={addMoney}>+</button>
      <button onClick={addAge}>添加年龄</button>
    </div>
  );
};

export default memo(Todo);
