/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-16 22:47:52
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-17 17:37:52
 */
import { FC } from 'react';
import CreateObserver from './helpers/observer';
export type ModelObj = { [key: string]: any };
export type ModelHooks<T extends ModelObj, P> = (args?: P) => T;
export type Dep<T> = (keyof T)[];
export interface LocalModel<T extends ModelObj> {
  (depFn?: Dep<T>): T;
  Provider: FC;
  getState: () => T;
}
declare global {
  interface Window {
    localModelStore: { [key: string]: CreateObserver<any> };
  }
}
