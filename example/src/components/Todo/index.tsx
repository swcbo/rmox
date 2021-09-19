import React from 'react';
import useMoneyModel from '../../models/useMoneyModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 18:44:16
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 19:07:01
 */
const Todo = () => {
  const { money } = useMoneyModel();
  const { addMoney } = useMoneyModel();
  return (
    <div>
      金额：{money} <button onClick={addMoney}>+</button>
    </div>
  );
};

export default Todo;
