import { ComponentType, Component, FC } from 'react'
import { TUseHook } from './index'

type Model = TUseHook<any>
type ModelType = Model | ReadonlyArray<Model>
type Props = Record<string, unknown>

type ModelFunctionType<T extends ReadonlyArray<Model>> = {
  readonly [P in keyof T]: T[P] extends (
    ...args: any
  ) => any
    ? ReturnType<T[P]>
    : T[P]
}

type TupleResult<T extends ReadonlyArray<Model>, P = Props, K = string> = (
  model: ModelFunctionType<T>,
) => (
  props: P,
) => Pick<
  ModelFunctionType<T> & P,
  Extract<K, keyof ModelFunctionType<T> & keyof P>
>

type FinalProps<T extends ModelType, P extends Props, K = string> = 
  ReturnType<ReturnType<TupleResult<T extends Model ? [T] : T, P, K>>>

function connect<T extends ModelType, P extends Props, K = string>(
  models: T,
  mergeToProps: TupleResult<T extends Model ? [T] : T, P, K>,
) {
  return (C: ComponentType) => {
    const Wrapper: FC<FinalProps<T, P, K>> = p => {
      return <C {...p} />
    }
    return class D extends Component<P> {
      render() {
        const transform = Array.isArray(models) ? models : [models]
        const _props = this.props
        const next = [] as unknown as ModelFunctionType<
          T extends Model ? [T] : T
        >
        transform.forEach(i => {
          (next as any).push(i())
        })
        const props = mergeToProps(next)(_props)
        return <Wrapper {...props} />
      }
    }
  }
}

export default connect;