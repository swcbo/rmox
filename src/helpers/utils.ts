/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-16 22:49:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-17 00:07:59
 */
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuId = tempUrl.toString();
  URL.revokeObjectURL(tempUrl);
  return uuId.substr(uuId.lastIndexOf('/') + 1);
};

//实现
//判断是否是对象或数组
const isObject = (obj: any) => {
  return typeof obj === 'object' && obj !== null;
};

export const pick = (obj: any, arr: string[]) =>
  arr.reduce(
    (iter: any, val) => (val in obj && (iter[val] = obj[val]), iter),
    {},
  );
export const isEqual = (obj1: any, obj2: any) => {
  // 两个数据有任何一个不是对象或数组
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型(注意：参与equal的一般不会是函数)
    return obj1 === obj2;
  }
  // 如果传的两个参数都是同一个对象或数组
  if (obj1 === obj2) {
    return true;
  }

  // 两个都是对象或数组，而且不相等
  // 1.先比较obj1和obj2的key的个数，是否一样
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  // 如果key的个数相等,就是第二步
  // 2.以obj1为基准，和obj2依次递归比较
  for (let key in obj1) {
    // 比较当前key的value  --- 递归
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }

  // 3.全相等
  return true;
};
