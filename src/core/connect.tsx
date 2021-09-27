import React, { FunctionComponent } from 'react';
const Connect = (models: any | any[], mapModelToProps: any) => {
  return function (Component: React.ComponentClass<any, any>) {
    const Wrapper: FunctionComponent<any> = (p) => {
      let modelProps: any = {};
      if (models instanceof Array) {
        modelProps = mapModelToProps(
          models.reduce((pre, now) => [...pre, now()], []),
          p,
        );
      } else {
        const store = models();
        modelProps = mapModelToProps(store, p);
      }
      const props = {
        ...p,
        ...modelProps,
      };
      return <Component {...props} />;
    };
    return Wrapper;
  };
};
export default Connect;
