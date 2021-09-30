import React, { ComponentType, Component, FC } from 'react'
import { TUseHook } from './index'
type ModelToProps<T, P> = (model: P) => T
export default function connect<T>(
  models: TUseHook<unknown> | TUseHook<any>[],
  mTp: ModelToProps<T, any>,
) {
  return (C: ComponentType) => {
    const Wrapper: FC<any> = (p: any) => {
      let mP
      if (models instanceof Array) {
        // @ts-ignore
        mP = mTp(models.reduce((pre, now) => [...pre, now({})], []))
      } else {
        const store = models()
        mP = mTp(store)
      }
      const props = {
        ...p,
        ...mP,
      }
      return <C {...props} />
    }
    return class C extends Component {
      render() {
        return <Wrapper />
      }
    }
  }
}
