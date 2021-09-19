import React from 'react';
import useCounter from '../../models/useCounter';
import useMoneyModel from '../../models/useMoneyModel';
import useUserModel from '../../models/useUserModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 09:55:41
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 19:05:17
 */
const Count = () => {
  const { count } = useCounter();
  return (
    <>
      <div style={{ fontSize: 30 }}>个数：{count}</div>
    </>
  );
};
export default Count;
