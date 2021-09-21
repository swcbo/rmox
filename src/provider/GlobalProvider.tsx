import React, { ReactNode, useCallback, useState } from 'react';
import Rmox from '../core/rmox';
const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [models, _] = useState(Rmox.getInstance().globalModel);
  const render = useCallback(
    (children) =>
      models.reduce(
        (parent, Component) => <Component>{parent}</Component>,
        children,
      ),
    [models],
  );
  return <>{render(children)}</>;
};

export default GlobalProvider;
