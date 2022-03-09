/*
 * @Author: swcbo
 * @Date: 2022-03-04 22:14:00
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-09 18:19:48
 * @FilePath: /rmox/src/helpers/utils.ts
 * @Description: 工具函数
 */
import type { ModelObj } from '../typing'
import fastCompare from 'react-fast-compare'
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob())
  const uuId = tempUrl.toString()
  URL.revokeObjectURL(tempUrl)
  return uuId.substr(uuId.lastIndexOf('/') + 1)
}
// 获取对象里面的指定值
export const pick = (obj: ModelObj, arr: string[]) =>
  arr.reduce(
    (iter: ModelObj, val) => (val in obj && (iter[val] = obj[val]), iter),
    {},
  )

// 判断对象是否相等
export const isEqual = (old: ModelObj, now: ModelObj) => fastCompare(old, now)

// 获取store里面指定值
export const pickStore = <T extends ModelObj>(deps: string[], state: T) =>
  deps.length === 0 ? state || {} : pick(state, deps)
