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
const CreateModel = <P, T extends ModelObj>(
  useHook: (init?: P) => T,
  options?: ModelOptions,
) => {
  const { global } = options || {};
  const name = useHook.name;
  if (!rmoxStore[name]) {
    rmoxStore[name] = new Observer<T>();
  }
  const observer = rmoxStore[name];
  const existProvider = rmox.globalModel.find(
    ({ name }) => name === useHook.name,
  )?.provider;
  const Provider: FC<{ init?: P }> = ({ init, children, ...props }) => {
    const store = useHook(init);
    const { state } = observer;
    !state && observer.setState(store);
    const isInit = useInit(() => {
      observer.dispatch(store);
    });

    useEffect(() => {
      if (!isInit.current) {
        observer.dispatch(store);
      }
      return () => observer.setState(undefined);
    }, [isInit, store]);
    const render = useMemo(
      () => <>{cloneElement(<>{children}</>, props)}</>,
      [children, props],
    );
    return render;
  };
  const provider = memo(Provider);
  if (global && !existProvider) {
    rmox.globalModel.unshift({ provider, name });
    rmox.observer.dispatch({});
  }
  return useModel<T, P>(observer, existProvider || provider, name);
};

export { CreateModel };
