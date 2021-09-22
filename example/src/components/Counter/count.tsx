import React, { memo } from 'react';
import useCounterModel from '../../models/useCounterModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 09:55:41
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 21:02:17
 */
const Count = () => {
  const { count, ces } = useCounterModel();
  console.log('Count render');
  return (
    <>
      <div style={{ fontSize: 30 }}>个数：{count}</div>
      <div>{ces.current}</div>
    </>
  );
};
export default memo(Count);
