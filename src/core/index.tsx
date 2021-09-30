import React, { FC, memo, useEffect, useMemo, cloneElement } from 'react'
import useInit from '../hooks/useInit'
import Observer from '../helpers/observer'
import useModel from '../hooks/useModel'
import Rmox from './rmox'
const rmox = Rmox.getInstance()
const rmoxStore = rmox.store

export type ModelObj = Record<string, unknown>
export interface TUseHook<T> {
  (init?: any): T
}
export type ModelOptions = {
  global?: boolean // 是否是全局
}
const CreateModel = <T extends ModelObj>(
  useHook: TUseHook<T>,
  options?: ModelOptions,
) => {
  if (!rmoxStore.get(useHook)) {
    rmoxStore.set(useHook, new Observer<T>())
  }
  const observer = rmoxStore.get(useHook)!!
  const existProvider = rmox.globalModel.get(useHook)
  const Provider: FC<{ init?: unknown }> = ({ init, children, ...props }) => {
    const store = useHook(init)
    const { state } = observer
    !state && observer.setState(store)
    const isInit = useInit(() => {
      observer.dispatch(store)
    })

    useEffect(() => {
      if (!isInit.current) {
        observer.dispatch(store)
      }
      return () => observer.setState(undefined)
    }, [isInit, store])
    const render = useMemo(
      () => <>{cloneElement(<>{children}</>, props)}</>,
      [children, props],
    )
    return render
  }
  const provider = memo(Provider)
  if (options?.global && !existProvider) {
    rmox.globalModel.set(useHook, provider)
    rmox.observer.dispatch({})
  }
  return useModel<T>(observer, existProvider || provider)
}

export { CreateModel }
