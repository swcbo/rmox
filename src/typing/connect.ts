import type { ComponentProps, ExecutedRes, ModelArray, TupleToObject } from "./index";

// 合并 元组结构 和 Props
type MergeModelAndProps<
  T extends ModelArray,
  P extends ComponentProps,
> = TupleToObject<ExecutedRes<T>> & P
// 获取有效的 key 值
type PickVaildKey<T extends ModelArray, P extends ComponentProps, K> = Extract<
  K,
  keyof MergeModelAndProps<T, P>
>
// 获取最终的返回值
export type FinalProps<
  T extends ModelArray,
  P extends ComponentProps,
  K = string,
> = Pick<MergeModelAndProps<T, P>, PickVaildKey<T, P, K>>
// 返回值定义
export type TransForm<T extends ModelArray, P extends ComponentProps, K = string> = (
  model: ExecutedRes<T>,
  prop: P,
) => Pick<MergeModelAndProps<T, P>, PickVaildKey<T, P, K>>
