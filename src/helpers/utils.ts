/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-16 22:49:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-17 23:28:40
 */
import { ModelObj } from 'src/core';
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuId = tempUrl.toString();
  URL.revokeObjectURL(tempUrl);
  return uuId.substr(uuId.lastIndexOf('/') + 1);
};
// 是否是对象
const isObject = (obj: any) => {
  return typeof obj === 'object' && obj !== null;
};
// 获取对象里面的指定值
export const pick = (obj: ModelObj, arr: string[]) =>
  arr.reduce(
    (iter: ModelObj, val) => (val in obj && (iter[val] = obj[val]), iter),
    {},
  );

// 判断对象是否相等
export const isEqual = (old: ModelObj, now: ModelObj) => {
  if (!isObject(old) || !isObject(now)) {
    return old === now;
  }
  if (old === now) {
    return true;
  }
  const oldKeys = Object.keys(old);
  const nowKeys = Object.keys(now);
  if (oldKeys.length !== nowKeys.length) {
    return false;
  }
  for (let key in old) {
    const res = isEqual(old[key], now[key]);
    if (!res) {
      return false;
    }
  }
  return true;
};

// 获取store里面指定值
export const pickStore = <T extends ModelObj>(deps: string[], state: T) =>
  deps.length === 0 ? state || {} : pick(state, deps);
