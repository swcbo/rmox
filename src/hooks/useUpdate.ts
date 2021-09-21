/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 12:49:43
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 11:27:58
 */
import { useState, useCallback } from 'react';
const useUpdate = () => {
  const [_, update] = useState(false);
  return useCallback(() => {
    update((v) => !v);
  }, []);
};
export default useUpdate;
