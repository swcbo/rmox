import React, { FC, useCallback, useEffect, useState } from 'react';
import Observer from '../helpers/observer';
import useModel from '../hooks/useModel';
import Rmox from './rmox';
const rmoxStore = Rmox.getInstance().store;
export type ModelObj = { [key: string]: any };
const GlobalProvider: FC = ({ children }) => {
  const [models, setModels] = useState(Rmox.getInstance().globalModel);
  const render = useCallback(
    (children) =>
      models.reduce(
        (parent, Component) => <Component>{parent}</Component>,
        children,
      ),
    [models],
  );
  return <>{render(children)}</>;
};
const createModel = <P, T extends ModelObj>(
  useHook: (init?: P) => T,
  storeName: string,
  global = false,
) => {
  if (!rmoxStore[storeName]) {
    rmoxStore[storeName] = new Observer<T>();
  }

  const observer = rmoxStore[storeName];

  const Provider: FC<{ init?: P }> = ({ children, init }) => {
    const hookState = useHook(init);
    if (!observer.state) {
      observer.setState(hookState);
    }
    useEffect(() => {
      observer.dispatch(hookState);
      return () => observer.setState(undefined);
    }, [hookState]);
    return <>{children}</>;
  };

  if (global) {
    Rmox.getInstance().globalModel.push(Provider);
  }
  return useModel<T, P>(observer, Provider);
};

export { createModel, GlobalProvider };
