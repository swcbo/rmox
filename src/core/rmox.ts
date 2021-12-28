import { FC } from 'react'
import Observer from '../helpers/observer'
class Rmox {
  store = new Map<any, Observer<any>>()
  globalModel = new Map<any, FC<any>>()
  observer = new Observer<any>()
}
const rmox = new Rmox()
export default rmox