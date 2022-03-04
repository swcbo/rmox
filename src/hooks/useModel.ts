import { FC, useContext, useEffect, useRef } from 'react'
import Observer from '../helpers/observer'
import { isEqual, pickStore } from '../helpers/utils'
import type { IProviderProps, ModelObj, TObserverContext } from '../typing'
import useInit from './useInit'
import useUpdate from './useUpdate'
export default <T extends ModelObj, P>(
  Provider: FC<IProviderProps<P>>,
  rmoxContext: TObserverContext<T>,
  observer?: Observer<T>,
) => {
  const Model = () => {
    const data = useContext(rmoxContext)
    const obRef = useRef<Observer<T>>(observer || data?.observer?.current)
    const update = useUpdate()
    const store = useRef<T>({ ...obRef.current?.state } as T)
    const depsFn = useRef<string[]>([])
    const current = store.current
    useInit(() => {
      Object.keys(current).forEach(v => {
        const value = current[v]
        Object.defineProperty(current, v, {
          get: () => {
            if (!depsFn.current.includes(v)) {
              depsFn.current.push(v)
            }
            return value
          },
        })
      })
    })
    useEffect(() => {
      return obRef.current?.subscribe((nextState: T) => {
        if (
          !isEqual(
            pickStore(depsFn.current, store.current),
            pickStore(depsFn.current, nextState),
          )
        ) {
          update()
        }
        store.current = nextState
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])
    return current
  }
  Model.Provider = Provider
  if (observer) {
    Model.dispatch = observer.dispatch
    Model.getData = () => observer.state
  }
  return Model
}
