import { useRef, useEffect, FC } from 'react';
import { isEqual, pickStore } from '../helpers/utils';
import useUpdate from './useUpdate';
import { ModelObj } from '../core/index';
import Observer from '../helpers/observer';

export default <T extends ModelObj, P>(
  observer: Observer<T>,
  Provider: FC<{ init?: P }>,
  name: string,
) => {
  const model = () => {
    const { state, subscribe } = observer;
    const update = useUpdate();
    const store = useRef<T>(({ ...state } || {}) as T);
    const depsFn = useRef<string[]>([]);
    const isInit = useRef(false);
    const current = store.current;
    const old = useRef(pickStore(depsFn.current, current));
    if (!isInit.current) {
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
      isInit.current = true;
    }
    useEffect(() => {
      return subscribe((nextState: T) => {
        store.current = nextState;
        const now = pickStore(depsFn.current, nextState);
        if (!isEqual(old.current, now)) {
          update();
        }
        old.current = now;
      });
    }, []);
    return current;
  };
  model.Provider = Provider;
  model.dispatch = observer.dispatch;
  model.getData = () => observer.state;
  return model;
};
