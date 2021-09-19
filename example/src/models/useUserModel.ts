import { useState } from 'react';
import { createModel } from '../../../src';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 16:27:15
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 17:45:41
 */
const useUserModel = () => {
  const [age, setAge] = useState(0);
  const addAge = () => setAge((age) => age + 1);
  return { addAge, age };
};
export default createModel(useUserModel, 'user', true);
