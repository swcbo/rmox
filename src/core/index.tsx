import React, { FC, memo, useEffect, useMemo, cloneElement } from 'react';
import useInit from '../hooks/useInit';
import Observer from '../helpers/observer';
import useModel from '../hooks/useModel';
import Rmox from './rmox';
const rmox = Rmox.getInstance();
const rmoxStore = rmox.store;

export type ModelObj = { [key: string]: any };
export type TUseHook = <T, P>(init?: P) => T;
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
  if (!rmox.globalModel[name]) {
    const Provider: FC<{ init?: P }> = ({ init, children, ...props }) => {
      const store = useHook(init);
      const { state, setState, dispatch } = observer;
      !state && setState(store);
      const isInit = useInit(() => {
        dispatch(store);
      });

      useEffect(() => {
        if (!isInit.current) {
          dispatch(store);
        }
        return () => setState(undefined);
      }, [store]);
      const render = useMemo(
        () => <>{cloneElement(<>{children}</>, props)}</>,
        [children],
      );
      return render;
    };
    const provider = memo(Provider);
    if (global) {
      rmox.globalModel[name] = provider;
      rmox.observer.dispatch({});
    }
    return useModel<T, P>(observer, provider, name);
  }
  return useModel<T, P>(observer, rmox.globalModel[name], name);
};

export { createModel };
