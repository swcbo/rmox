/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-20 21:31:16
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-22 16:12:02
 */
import { ModelObj } from '../core';
import { uuid } from './utils';
export default class Observer<T extends ModelObj> {
  subs: { [key: string]: (state: T) => void } = {};
  state: T | undefined;
  setState = (state: T | undefined) => {
    this.state = state;
  };
  dispatch = (state: T) => {
    this.state = state;
    Object.values(this.subs).forEach((f) => f(state));
  };
  subscribe = (fun: (state: T) => void) => {
    const id = uuid();
    this.subs[id] = fun;
    return () => {
      delete this.subs[id];
    };
  };
}
