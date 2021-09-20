import React, { FC, memo, useEffect } from 'react';
import Observer from '../helpers/observer';
export default <T, P>(observer: Observer<T>, useHook: (init?: P) => T) => {
  const Wrapper: FC<{ init?: P }> = ({ children, init }) => {
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
  return memo(Wrapper);
};
