/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 12:49:43
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 12:49:44
 */
import { useState, useCallback } from 'react';
const useUpdate = () => {
  const [_, update] = useState(1);
  return useCallback(() => {
    update((it) => it + 1);
  }, []);
};
export default useUpdate;
