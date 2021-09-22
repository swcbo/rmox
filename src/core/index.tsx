/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-21 21:42:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 22:29:02
 */
import React, { FC, memo, useEffect, useMemo } from 'react';
import useInit from '../hooks/useInit';
import Observer from '../helpers/observer';
import useModel from '../hooks/useModel';
import Rmox from './rmox';
const rmoxStore = Rmox.getInstance().store;
export type ModelObj = { [key: string]: any };
const createModel = <P, T extends ModelObj>(
  useHook: (init?: P) => T,
  global = false,
) => {
  const name = useHook.name;
  if (!rmoxStore[name]) {
    rmoxStore[name] = new Observer<T>();
  }
  const observer = rmoxStore[name];
  const Provider: FC<{ init?: P }> = ({ init, children }) => {
    const hookState = useHook(init);
    const { state, setState, dispatch } = observer;
    if (!state) {
      setState(hookState);
    }
    const isInit = useInit(() => {
      dispatch(hookState);
    });

    useEffect(() => {
      if (!isInit.current) {
        dispatch(hookState);
      }
      return () => setState(undefined);
    }, [hookState]);
    return useMemo(() => <>{children}</>, []);
  };
  const provider = memo(Provider);
  if (global) {
    Rmox.getInstance().globalModel.unshift(provider);
  }
  return useModel<T, P>(observer, provider, name);
};

export { createModel };
