import React, { FC, useState, useCallback, memo } from 'react';
import Rmox from '../core/rmox';
const GlobalProvider: FC = ({ children }) => {
  const [models, setModels] = useState(Rmox.getInstance().globalModel);
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

export default memo(GlobalProvider);
