import React, { memo } from 'react';
import useCounterModel from '../../models/useCounterModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 09:55:41
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 15:39:48
 */
const Count = () => {
  const { count } = useCounterModel();
  return (
    <>
      <div style={{ fontSize: 30 }}>个数：{count}</div>
    </>
  );
};
export default memo(Count);
