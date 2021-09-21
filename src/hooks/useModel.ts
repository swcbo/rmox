/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-20 21:31:16
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-21 15:40:06
 */
import { useRef, useEffect, FC } from 'react';
import { isEqual, pickStore } from '../helpers/utils';
import useUpdate from './useUpdate';
import useInit from './useInit';
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
    const store = useRef<T>({ ...state } as T);
    const depsFn = useRef<string[]>([]);
    const current = store.current;
    const old = useRef(current);
    useInit(() => {
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
    });
    useEffect(() => {
      return subscribe((nextState: T) => {
        store.current = nextState;
        if (
          !isEqual(
            pickStore(depsFn.current, old.current),
            pickStore(depsFn.current, nextState),
          )
        ) {
          update();
        }
        old.current = nextState;
      });
    }, []);
    if (!Object.keys(current).length) {
      console.error(
        `${name} Initialization failed due to loop nesting or parent call subset`,
      );
    }
    return current;
  };
  model.Provider = Provider;
  model.dispatch = observer.dispatch;
  model.getData = () => observer.state;
  return model;
};
