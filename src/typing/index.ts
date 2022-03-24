/*
 * @Author: swcbo
 * @Date: 2022-03-04 22:14:00
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-24 20:49:18
 * @FilePath: /rmox/src/typing/index.ts
 * @Description: 数据类型
 */
import { Context, MutableRefObject } from 'react'
import Observer from 'src/helpers/observer'

export interface TUseHook<T, P> {
  (value: P): T
}

export type TObserverContext<T> = Context<{
  observer: MutableRefObject<Observer<T>>
}>
export type IProviderProps<T> = unknown extends T ? {} : { value: T }
export type ModelOptions = {
  global?: boolean // 是否是全局
}

export type ModelObj = Record<string, any>
export type Model = TUseHook<any, unknown>
export type ModelArray = ReadonlyArray<Model>
export type ModelType = Model | ModelArray
export type ComponentProps = Record<string, unknown>
// 执行可执行元素
type Exec<T> = T extends (...args: any) => any ? ReturnType<T> : T
// 处理元组, 将可执行函数元素转换为 返回值
export type ExecutedRes<T extends ModelArray> = T extends readonly [
  infer R,
  ...infer U
]
  ? R extends never
    ? []
    : readonly [Exec<R>, ...(U extends ModelArray ? ExecutedRes<U> : [])]
  : []
// 合并属性
type Assign<T extends Record<any, any>, V extends Record<any, any>> = {
  [key in keyof (T & V)]: (T & V)[key]
}
// 元组转对象
export type TupleToObject<T extends readonly any[]> = T extends readonly [
  infer R,
  ...infer U
]
  ? R extends string | number
    ? Assign<Record<R, R>, TupleToObject<U>>
    : R extends Record<any, any>
    ? Assign<{ [k in keyof R]: R[k] }, TupleToObject<U>>
    : {}
  : {}
