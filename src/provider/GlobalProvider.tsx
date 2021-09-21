import React, { FC, memo, useCallback, useState } from 'react';
import Rmox from '../core/rmox';
const GlobalProvider: FC = ({ children }) => {
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

export default memo(GlobalProvider);
