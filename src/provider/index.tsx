import React, { FC, memo, useEffect, useRef } from 'react';
import Observer from '../helpers/observer';
export default <T, P>(observer: Observer<T>, useHook: (init?: P) => T) => {
  const Wrapper: FC<{ init?: P }> = ({ children, init }) => {
    const { state, setState, dispatch } = observer;
    const isInit = useRef(false);
    const hookState = useHook(init);
    if (!state) {
      setState(hookState);
    }
    useEffect(() => {
      if (isInit.current) {
        dispatch(hookState);
      }
      isInit.current = true;
      return () => setState(undefined);
    }, [hookState]);
    return <>{children}</>;
  };
  return memo(Wrapper);
};
