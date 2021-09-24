/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-21 21:42:44
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-24 13:02:11
 */
import React, { FC, memo, useEffect, useMemo, cloneElement } from 'react';
import useInit from '../hooks/useInit';
import Observer from '../helpers/observer';
import useModel from '../hooks/useModel';
import Rmox from './rmox';
const rmoxStore = Rmox.getInstance().store;
export type ModelObj = { [key: string]: any };
export type ModelOptions = {
  global?: boolean; // 是否是全局
};
const createModel = <P, T extends ModelObj>(
  useHook: (init?: P) => T,
  options?: ModelOptions,
) => {
  const { global } = options || {};
  const name = useHook.name;
  if (!rmoxStore[name]) {
    rmoxStore[name] = new Observer<T>();
  }
  const observer = rmoxStore[name];
  const Provider: FC<{ init?: P }> = ({ init, children, ...props }) => {
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
    const render = useMemo(
      () => <>{cloneElement(<>{children}</>, props)}</>,
      [children],
    );
    return render;
  };
  const provider = memo(Provider);
  if (global) {
    Rmox.getInstance().globalModel.unshift(provider);
  }
  return useModel<T, P>(observer, provider, name);
};

export { createModel };
