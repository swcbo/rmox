import { FC } from 'react'
import type { ModelObj } from '../typing'
export default class Observer<T extends ModelObj> {
  id = 0
  subs: { [key: string]: (state: T) => void } = {}
  state: T | undefined
  provider?: FC<any>

  setState = (state: T | undefined) => {
    this.state = state
  }
  dispatch = (state: T) => {
    this.state = state
    Object.values(this.subs).forEach(f => f(state))
  }
  subscribe = (fun: (state: T) => void) => {
    const id = ++this.id
    this.subs[id] = fun
    return () => {
      delete this.subs[id]
    }
  }
}
