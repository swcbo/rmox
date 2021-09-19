import React from 'react';
import useCounter from '../../models/useCounter';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 09:55:41
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 10:01:28
 */
const Count = () => {
  const { count } = useCounter();
  return <span style={{ fontSize: 30 }}>{count}</span>;
};
export default Count;
