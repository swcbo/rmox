import React, {
  cloneElement,
  createContext,
  FC,
  memo,
  useEffect,
  useRef,
} from 'react'
import Observer from '../helpers/observer'
import { uuid } from '../helpers/utils'
import useInit from '../hooks/useInit'
import useModel from '../hooks/useModel'
import type { ModelObj, ModelOptions, TUseHook } from '../typing'
import Rmox from './rmox'
const rmox = Rmox.getInstance()
const rmoxStore = rmox.store
export const RmoxContext = createContext<any>(null)
const CreateModel = <T extends ModelObj>(
  useHook: TUseHook<T>,
  options?: ModelOptions,
) => {
  const isGlobal = options?.global
  const globalObserver = new Observer<T>()

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
  const Provider: FC<{ init?: unknown }> = ({ init, children, ...props }) => {
    const uidRef = useRef(isGlobal ? useHook : uuid())
    const uid = uidRef.current
    const rmoxObs = rmoxStore.get(uid)
    const observer = useRef(
      isGlobal
        ? globalObserver
        : rmoxObs || rmoxStore.set(uid, new Observer<T>()).get(uid),
    )
    const render = (
      <>
        <Executor init={init} observer={observer.current} />
        {cloneElement(<>{children}</>, props)}
      </>
    )
    return isGlobal ? (
      render
    ) : (
      <RmoxContext.Provider value={{ observer }}>{render}</RmoxContext.Provider>
    )
  }
  const provider = memo(Provider)
  if (isGlobal && !rmox.globalModel.get(useHook)) {
    rmox.globalModel.set(useHook, provider)
    rmox.observer.dispatch({})
  }
  return useModel<T>(provider, isGlobal ? globalObserver : undefined)
}

export { CreateModel }
