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
import type { ModelObj, ModelOptions, TUseHook } from '../typing'
import rmox from './rmox'
const rmoxStore = rmox.store
export const RmoxContext = createContext<any>(null)
const CreateModel = <T extends ModelObj>(
  useHook: TUseHook<T>,
  options?: ModelOptions,
) => {
  const isGlobal = options?.global
  if (!rmoxStore.get(useHook)) {
    rmoxStore.set(useHook, new Observer<T>())
  }

  const existProvider = rmox.globalModel.get(useHook)
  const Executor = ({ init, observer }: any) => {
    const store = useHook(init)
    const obsRef = useRef(observer)
    const isInit = useInit(() => {
      obsRef.current.dispatch(store)
    })
    useEffect(() => {
      const obS = obsRef.current
      !isInit.current && obS.dispatch(store)
      return () => obS.setState(undefined)
    }, [isInit, store])
    return <></>
  }
  const Provider: FC<{ init?: unknown }> = ({ init, children }) => {
    const uidRef = useRef(isGlobal ? useHook : uuid())
    const uid = uidRef.current
    const rmoxObs = rmoxStore.get(uid)
    const observer = useRef(
      isGlobal
        ? rmoxStore.get(useHook)
        : rmoxObs || rmoxStore.set(uid, new Observer<T>()).get(uid),
    )
    const executor = useMemo(() => {
      return <Executor init={init} observer={observer.current} />
    }, [init])

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
  if (isGlobal && !rmox.globalModel.get(useHook)) {
    rmox.globalModel.set(useHook, provider)
    rmox.observer.dispatch({})
  }
  return useModel<T>(
    existProvider || provider,
    isGlobal ? rmoxStore.get(useHook) : undefined,
  )
}

export { CreateModel }
