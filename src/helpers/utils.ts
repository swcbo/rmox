/*
 * @Author: swcbo
 * @Date: 2022-03-04 22:14:00
 * @LastEditors: swcbo
 * @LastEditTime: 2022-04-01 10:07:08
 * @FilePath: /rmox/src/helpers/utils.ts
 * @Description: 工具函数
 */
import type { ModelObj } from '../typing'

// 获取对象里面的指定值
export const pick = (obj: ModelObj, arr: string[]) =>
  arr.reduce(
    (iter: ModelObj, val) => (val in obj && (iter[val] = obj[val]), iter),
    {},
  )

// 判断对象是否相等
export const isEqual = (old: ModelObj, now: ModelObj) => old === now
// 获取store里面指定值
export const pickStore = <T extends ModelObj>(deps: string[], state: T) =>
  deps.length === 0 ? state || {} : pick(state, deps)
