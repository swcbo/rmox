import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import Rmox from '../core/rmox';
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [models, setModels] = useState(Rmox.getInstance().globalModel);
  const render = useCallback(
    () =>
      models.reduce(
        (parent, Component) => <Component> {parent}</Component>,
        <></>,
      ),
    [models],
  );
  useEffect(() => {
    Rmox.getInstance().observer.subscribe(() => {
      setModels([...Rmox.getInstance().globalModel]);
    });
  }, []);
  return (
    <>
      {render()}
      {children}
    </>
  );
};

export default GlobalProvider;
