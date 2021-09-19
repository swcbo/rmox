import React, { FC, useEffect, useRef } from 'react';
import Observer from '../helpers/observer';
import { isEqual, pickStore } from '../helpers/utils';
import useUpdate from '../hooks/useUpdate';
export type ModelObj = { [key: string]: any };
declare global {
  interface Window {
    modelStore: { [key: string]: Observer<any> };
  }
}

if (!window.modelStore) {
  window.modelStore = {};
}
const createModel = <T extends ModelObj, P>(
  useHook: (init?: P) => T,
  storeName: string,
) => {
  if (!window.modelStore[storeName]) {
    window.modelStore[storeName] = new Observer<T>();
  }
  const observer: Observer<T> = window.modelStore[storeName];
  const Provider: FC<{ init: P }> = ({ children, init }) => {
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

  const useModel = () => {
    const update = useUpdate();
    const state = useRef((observer.state!! || {}) as T);
    const depsFnRef = useRef<string[]>([]);
    const isInit = useRef(false);
    const realData = state.current;
    if (!isInit.current) {
      Object.keys(realData).forEach((v) => {
        const value = realData[v];
        Object.defineProperty(realData, v, {
          get: () => {
            if (!depsFnRef.current.includes(v)) {
              depsFnRef.current.push(v);
            }
            return value;
          },
        });
      });
    }
    const oldStore = useRef(pickStore(depsFnRef.current, state));
    isInit.current = true;
    useEffect(() => {
      return observer.subscribe((nextState: T) => {
        state.current = nextState;
        if (!depsFnRef.current) {
          update();
          return;
        }
        state.current = nextState;
        const newDeps = pickStore(depsFnRef.current, nextState);
        if (!isEqual(oldStore.current, newDeps)) {
          update();
        }
        oldStore.current = newDeps;
      });
    }, []);
    return state.current;
  };
  useModel.Provider = Provider;
  useModel.getState = () => observer.state!!;
  return useModel;
};

export default createModel;
