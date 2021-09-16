/*
 * @Author: 筱白
 * @Date: 2021-03-17 10:50:22
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-16 22:49:43
 * @Description: 观察者
 */
import { ModelObj } from '../typings';
import { uuid } from './utils';
export default class CreateObserver<T extends ModelObj> {
  listeners: { [key: string]: (state: T) => void } = {};
  state: T | undefined;
  setState = (state: T | undefined) => {
    this.state = state;
  };

  dispatch = (state: T) => {
    this.state = state;
    Object.values(this.listeners).forEach((fun) => fun(state));
  };

  subscribe = (fun: (state: T) => void) => {
    const id = uuid();
    this.listeners[id] = fun;
    return () => {
      delete this.listeners[id];
    };
  };
}