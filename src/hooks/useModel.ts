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
    const depsFn = useRef<string[]>([]);
    const isInit = useRef(false);
    if (!isInit.current) {
      const current = state.current;
      Object.keys(current).forEach((v) => {
        const value = current[v];
        Object.defineProperty(current, v, {
          get: () => {
            if (!depsFn.current.includes(v)) {
              depsFn.current.push(v);
            }
            return value;
          },
        });
      });
    }
    const old = useRef(pickStore(depsFn.current, state));
    isInit.current = true;
    useEffect(() => {
      return observer.subscribe((nextState: T) => {
        state.current = nextState;
        if (!depsFn.current) {
          update();
          return;
        }
        state.current = nextState;
        const now = pickStore(depsFn.current, nextState);
        if (!isEqual(old.current, now)) {
          update();
        }
        old.current = now;
      });
    }, []);
    return state.current;
  };
  model.Provider = Provider;
  return model;
};
