import { FC, useEffect, useRef, useState } from 'react';
import { isEqual, pick } from 'src/helpers/utils';
import Observer from '../helpers/observer';
export type ModelObj = { [key: string]: any };
type ModelHooks<T extends ModelObj, P> = (init?: P) => T;
declare global {
  interface Window {
    modelStore: { [key: string]: Observer<any> };
  }
}

const diffStore = <T extends ModelObj>(deps: string[], state: T) =>
  deps.length === 0 ? state || {} : pick(state, deps);
if (!window.modelStore) {
  window.modelStore = {};
}
const createModel = <T extends ModelObj, P>(
  useHook: ModelHooks<T, P>,
  storeName: string,
) => {
  if (!window.modelStore[storeName]) {
    window.modelStore[storeName] = new Observer<T>();
  }
  const observer: Observer<T> = window.modelStore[storeName];
  let isInitModel = true;
  const Provider: FC<{ init?: P }> = ({ children, init }) => {
    const hookState = useHook(init);
    const isInit = useRef(true);
    if (!observer.state) {
      observer.setState(hookState);
    }
    useEffect(() => {
      if (!isInit.current) {
        observer.dispatch(hookState);
      }
      isInit.current = false;
    }, [hookState]);
    useEffect(() => {
      isInitModel = false;
      return () => {
        if (!isInitModel) {
          observer.setState(undefined);
        }
      };
    }, []);
    // eslint-disable-next-line react/react-in-jsx-scope
    return <>{children}</>;
  };
  const useModel = () => {
    const [state, setState] = useState<T>((observer.state!! || {}) as T);
    const depsFnRef = useRef<string[]>([]);
    const isInit = useRef(false);
    if (!isInit.current) {
      Object.keys(state).forEach((v) => {
        const value = state[v];
        Object.defineProperty(state, v, {
          get: () => {
            if (!depsFnRef.current.includes(v)) {
              depsFnRef.current.push(v);
            }
            return value;
          },
        });
      });
    }
    const depsRef = useRef(diffStore(depsFnRef.current, state));
    isInit.current = true;
    useEffect(() => {
      const unsubscribe = observer.subscribe((nextState: T) => {
        if (!depsFnRef.current) {
          setState(nextState!!);
          return;
        }
        const oldDeps = depsRef.current;
        const newDeps = diffStore(depsFnRef.current, nextState);
        if (!isEqual(oldDeps, newDeps)) {
          setState(nextState!!);
        }

        depsRef.current = newDeps;
      });
      return () => {
        unsubscribe();
      };
    }, []);
    return state;
  };
  useModel.Provider = Provider;
  useModel.getState = () => observer.state!!;
  return useModel;
};

export default createModel;
