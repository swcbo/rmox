import React, { memo } from 'react';
import useCounterModel from '../../models/useCounterModel';
/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-22 19:15:13
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 19:18:15
 */
const Test = () => {
  const { setTest } = useCounterModel();
  console.log('Test render');
  return <button onClick={() => setTest((v) => v + 1)}>测试render</button>;
};

export default memo(Test);
