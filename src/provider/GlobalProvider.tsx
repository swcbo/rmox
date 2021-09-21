import React, { FC, useState, useCallback, memo, cloneElement } from 'react';
import Rmox from '../core/rmox';
const GlobalProvider: FC = ({ children }) => {
  const [models, setModels] = useState(Rmox.getInstance().globalModel);
  const render = useCallback(
    (children) => {
      let wrapper = models.reduce(
        (parent, Component) => <Component>{parent}</Component>,
        children,
      );
      let A = models[1];
      let B = models[0];
      let warpper = (
        <>
          <B>
            <A>{children}</A>
          </B>
        </>
      );

      return wrapper;
    },
    [models],
  );
  return <>{render(children)}</>;
};

export default memo(GlobalProvider);
