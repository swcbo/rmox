import { ComponentType, Component, FC } from 'react'
import { TUseHook } from './index'

export type Model = TUseHook<any>;
export type ModelArray = ReadonlyArray<Model>;
export type ModelType = Model | ModelArray;
export type Props = Record<string, unknown>;
// 执行可执行元素
type Exec<T> = T extends (...args: any) => any ? ReturnType<T> : T;
// 处理元组, 将函数函数元素转换为 返回值
export type ExecutedRes<T extends ModelArray> = T extends readonly [
  infer R,
  ...infer U
]
  ? R extends never
  ? []
  : readonly [Exec<R>, ...(U extends ModelArray ? ExecutedRes<U> : [])]
  : [];
// 合并属性
type Assign<T extends Record<any, any>, V extends Record<any, any>> = {
  [key in keyof (T & V)]: (T & V)[key];
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
  : {};
// 
type MergeModelAndProps<T extends ModelArray, P extends Props> = TupleToObject<ExecutedRes<T>> & P;
// 获取有效的 key 值
type PickVaildKey<T extends ModelArray, P extends Props, K> = Extract<
  K,
  keyof MergeModelAndProps<T, P>
>
// 获取最终的返回值
export type FinalProps<T extends ModelArray, P extends Props, K = string> = Pick<
  MergeModelAndProps<T, P>,
  PickVaildKey<T, P, K>
>
// 返回值定义
type TransForm<T extends ModelArray, P extends Props, K = string> = (model: ExecutedRes<T>, prop: P) => Pick<MergeModelAndProps<T, P>, PickVaildKey<T, P, K>>;


function connect<T extends ModelType, P extends Props, K = string>(
  models: T,
  mergeToProps: TransForm<T extends Model ? [T] : T, P, K>,
) {
  return (C: ComponentType<any>) => {
    const Wrapper: FC<FinalProps<T extends Model ? [T] : T, P, K>> = p => {
      return <C {...p} />
    }
    return class D extends Component<any> {
      render() {
        const transform = Array.isArray(models) ? models : [models];
        const _props = this.props;
        const next = [] as unknown as ExecutedRes<T extends Model ? [T] : T>;
        transform.forEach(i => {
          (next as any).push(i())
        });
        const props = mergeToProps(next, _props as P);
        return (
          <Wrapper
            {...(props)}
          />
        )
      }
    }
  }
}

export default connect;