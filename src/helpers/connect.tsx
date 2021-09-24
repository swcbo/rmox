/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-23 23:41:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-23 23:53:39
 */
import React, { createElement, FC } from 'react';
const Connect = (model: any) => {
  return (Component: React.ComponentClass) => {
    const Wrapper: FC = () => {
      const data = model();
      return <>{createElement(Component, { ...data })}</>;
    };
    return Wrapper;
  };
};

export default Connect;
