/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-23 23:41:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-26 23:23:54
 */
import React, { FunctionComponent } from 'react';
function Connect(models: any | any[]) {
  return function (Component: React.ComponentClass<any, any>) {
    const Wrapper: FunctionComponent<any> = (p) => {
      let modelProps: any = {};
      if (models instanceof Array) {
        // modelProps = mapModelToProps(
        //   // @ts-ignore
        //   models.reduce((pre, now) => [...pre, now()], []),
        //   p,
        // );
      } else {
        const store = models();
        // modelProps = mapModelToProps(store, p);
      }
      const props = {
        ...p,
        ...modelProps,
      };
      return <Component {...props} />;
    };
    return Wrapper;
  };
}
export default Connect;
