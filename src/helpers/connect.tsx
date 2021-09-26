/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-23 23:41:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-26 20:18:20
 */
import React, { FC } from 'react';
import { TUseHook } from '../core/index';
const Connect = (
  models: TUseHook | TUseHook[],
  mapModelToProps: (modes: any, props: unknown) => any,
) => {
  return (Component: React.ComponentClass) => {
    const Wrapper: FC = (p) => {
      let modelProps: any = {};
      if (models instanceof Array) {
        modelProps = mapModelToProps(
          // @ts-ignore
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
