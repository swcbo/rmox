import React, { FC, useEffect, useMemo, useState } from 'react';
import Rmox from '../core/rmox';
const rmox = Rmox.getInstance();
const Wrapper = () => {
  const [models, setModels] = useState(rmox.globalModel);
  useEffect(() => {
    rmox.observer.subscribe(() => {
      setModels([...rmox.globalModel]);
    });
  }, []);
  return useMemo(
    () =>
      models.reduce(
        (p, { provider: C }) => (
          <>
            <C />
            {p}
          </>
        ),
        <></>,
      ),
    [models],
  );
};
const GlobalProvider: FC = ({ children }) => {
  return (
    <>
      <Wrapper />
      {children}
    </>
  );
};

export default GlobalProvider;
