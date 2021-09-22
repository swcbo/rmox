/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-20 21:31:16
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 19:06:42
 */
import React, { FC, memo, useEffect, useMemo, useRef } from 'react';
import Observer from '../helpers/observer';
const Provider = <T, P>(observer: Observer<T>, useHook: (init?: P) => T) => {
  const Wrapper: FC<{ init?: P }> = ({ init, children }) => {
    const hookState = useHook(init);
    const { state, setState, dispatch } = observer;
    const isInit = useRef(true);
    if (!state) {
      setState(hookState);
    }

    useEffect(() => {
      if (!isInit.current) {
        dispatch(hookState);
      }
      isInit.current = false;
      return () => setState(undefined);
    }, [hookState]);
    return useMemo(() => <>{children}</>, []);
  };
  return memo(Wrapper);
};
export default Provider;
