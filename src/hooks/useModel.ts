import { useRef, useEffect, FC } from 'react';
import { isEqual, pickStore } from '../helpers/utils';
import useUpdate from './useUpdate';
import { ModelObj } from '../core/index';
import Observer from '../helpers/observer';

export default <T extends ModelObj, P>(
  observer: Observer<T>,
  Provider: FC<{ init?: P }>,
) => {
  const model = () => {
    const update = useUpdate();
    const state = useRef<T>((observer.state!! || {}) as T);
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
  model.Provider = Provider;
  return model;
};
