/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-21 11:23:24
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 22:25:18
 */
import { useRef } from 'react';
const useInit = (fun: () => void) => {
  const isInit = useRef(true);
  if (isInit.current) {
    fun();
    isInit.current = false;
  }
  return isInit;
};

export default useInit;
