/*
 * @Author: swcbo
 * @Date: 2022-03-04 22:14:00
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-24 20:55:14
 * @FilePath: /rmox/src/core/index.tsx
 * @Description: 核心模块
 */
import React, {
  createContext,
  FC,
  memo,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import Observer from '../helpers/observer'
import { isEqual, uuid } from '../helpers/utils'
import useInit from '../hooks/useInit'
import useModel from '../hooks/useModel'
import type {
  IProviderProps,
  ModelObj,
  ModelOptions,
  TUseHook,
} from '../typing'
import rmox from './rmox'
const rmoxStore = rmox.store

const CreateModel = <T extends ModelObj, P>(
  useHook: TUseHook<T, P>,
  options?: ModelOptions,
) => {
  const isGlobal = options?.global
  if (!rmoxStore.get(useHook)) {
    rmoxStore.set(useHook, new Observer<T>())
  }
  const RmoxContext = createContext<any>(null)
  const existProvider = rmox.globalModel.get(useHook)
  const Executor = ({
    value,
    observer,
  }: {
    value: P
    observer: Observer<T>
  }) => {
    const store = useHook(value)
    const obsRef = useRef(observer)
    const isInit = useInit(() => {
      obsRef.current.dispatch(store)
    })
    useEffect(() => {
      const obS = obsRef.current
      !isInit.current && obS.dispatch(store)
    }, [isInit, store])
    return <></>
  }
  const Provider: FC<IProviderProps<P>> = props => {
    const { value, children } = props as any
    const uidRef = useRef(isGlobal ? useHook : uuid())
    const uid = uidRef.current
    const rmoxObs = rmoxStore.get(uid)
    const observer = useRef(
      (isGlobal
        ? rmoxStore.get(useHook)
        : rmoxObs ||
          rmoxStore.set(uid, new Observer<T>()).get(uid)) as Observer<T>,
    )
    const executor = useMemo(() => {
      return <Executor value={value} observer={observer.current} />
    }, [value])

    const render = (
      <>
        {executor}
        {children}
      </>
    )
    return isGlobal ? (
      render
    ) : (
      <RmoxContext.Provider value={{ observer }}>{render}</RmoxContext.Provider>
    )
  }

  const provider = memo(Provider, isEqual)
  // 如果为全局model并且不存在就添加到全局集合(防止全局多次注册)
  if (isGlobal && !rmox.globalModel.get(useHook)) {
    rmox.globalModel.set(useHook, provider)
    rmox.observer.dispatch({})
  }
  return useModel<T, P>(
    existProvider || provider,
    RmoxContext,
    isGlobal ? rmoxStore.get(useHook) : undefined,
  )
}

export { CreateModel }
