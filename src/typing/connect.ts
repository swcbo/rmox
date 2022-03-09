/*
 * @Author: swcbo
 * @Date: 2021-11-13 18:21:36
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-09 18:20:27
 * @FilePath: /rmox/src/typing/connect.ts
 * @Description: 关联组件
 */
import type {
  ComponentProps,
  ExecutedRes,
  ModelArray,
  TupleToObject,
} from './index'

// 合并 元组结构 和 Props
type MergeModelAndProps<
  T extends ModelArray,
  P extends ComponentProps,
> = TupleToObject<ExecutedRes<T>> & P
// 获取有效的 key 值
type PickValidKey<T extends ModelArray, P extends ComponentProps, K> = Extract<
  K,
  keyof MergeModelAndProps<T, P>
>
// 获取最终的返回值
export type FinalProps<
  T extends ModelArray,
  P extends ComponentProps,
  K = string,
> = Pick<MergeModelAndProps<T, P>, PickValidKey<T, P, K>>
// 返回值定义
export type TransForm<
  T extends ModelArray,
  P extends ComponentProps,
  K = string,
> = (
  model: ExecutedRes<T>,
  prop: P,
) => Pick<MergeModelAndProps<T, P>, PickValidKey<T, P, K>>
