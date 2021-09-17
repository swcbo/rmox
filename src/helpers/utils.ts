import { ModelObj } from 'src/core';
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuId = tempUrl.toString();
  URL.revokeObjectURL(tempUrl);
  return uuId.substr(uuId.lastIndexOf('/') + 1);
};

const isObject = (obj: any) => {
  return typeof obj === 'object' && obj !== null;
};

export const pick = (obj: ModelObj, arr: string[]) =>
  arr.reduce(
    (iter: ModelObj, val) => (val in obj && (iter[val] = obj[val]), iter),
    {},
  );
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
