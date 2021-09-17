/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-16 22:48:26
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-17 15:23:06
 */
/*
 * @Author: 筱白
 * @Date: 2021-03-16 13:45:21
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-16 22:50:33
 * @Description: localModel
 */
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { isEqual, pick } from 'src/helpers/utils';
import CreateObserver from '../helpers/observer';
import { LocalModel, ModelHooks, ModelObj } from '../typings';
// check obj diff
const checkFunDependBackState = <T extends ModelObj>(depFn: any[], state: T) =>
  depFn.length === 0 ? state || {} : pick(state, depFn);
// set global localModelStore
if (!window.localModelStore) {
  window.localModelStore = {};
}
const createLocalModel = <T extends ModelObj, P>(
  useCustomizedHook: ModelHooks<T, P>,
  storeName = '',
) => {
  if (!window.localModelStore[storeName]) {
    window.localModelStore[storeName] = new CreateObserver<T>();
  }
  const observer: CreateObserver<T> = window.localModelStore[storeName];
  let isInitModel = true;
  // provider
  const Provider: FC<{ init?: P; children: ReactNode }> = ({
    children,
    init,
  }) => {
    // custom hooks bind
    const hookState = useCustomizedHook(init);
    // hot reload (create -> unmount -> mount)
    const isInit = useRef(true);
    if (!observer.state) {
      observer.setState(hookState);
    }
    // listener change
    useEffect(() => {
      if (!isInit.current) {
        observer.dispatch(hookState);
      }
      isInit.current = false;
    }, [hookState]);
    // clean current state
    useEffect(() => {
      isInitModel = false;
      return () => {
        if (!isInitModel) {
          observer.setState(undefined);
        }
      };
    }, []);
    return <>{children}</>;
  };
  // model
  const useLocalModel: LocalModel<T> = () => {
    const [currentState, setCurrentState] = useState<T>(
      (observer.state!! || {}) as T,
    );
    const depsFnRef = useRef<string[]>([]);
    // collect bind field
    const isInit = useRef(false);

    if (!isInit.current) {
      Object.keys(currentState).forEach((v) => {
        const value = currentState[v];
        Object.defineProperty(currentState, v, {
          get: function () {
            if (!depsFnRef.current.includes(v)) {
              depsFnRef.current.push(v);
            }
            return value;
          },
        });
      });
    }
    const depsRef = useRef(
      checkFunDependBackState(depsFnRef.current, currentState),
    );
    isInit.current = true;
    useEffect(() => {
      const unsubscribe = observer.subscribe((nextState: T) => {
        if (!depsFnRef.current) {
          setCurrentState(nextState!!);
          return;
        }
        const oldDeps = depsRef.current;
        const newDeps = checkFunDependBackState(depsFnRef.current, nextState);
        if (!isEqual(oldDeps, newDeps)) {
          setCurrentState(nextState!!);
        }

        depsRef.current = newDeps;
      });
      return () => {
        unsubscribe();
      };
    }, []);

    return currentState;
  };
  useLocalModel.Provider = Provider;
  useLocalModel.getState = () => observer.state!!;
  return useLocalModel;
};

export default createLocalModel;
