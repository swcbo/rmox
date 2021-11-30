import { useRef } from 'react'
/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: 小白
 * @LastEditTime: 2021-11-29 23:42:25
 */
import { useCallback, useState } from 'react'
import { createModel } from '../../../src/index'
const useCounterModel = (init?: number) => {
  const ces = useRef(0)
  const [count, setCount] = useState(init || 1)
  const [test, setTest] = useState(1)
  const del = useCallback(() => setCount(count => count - 1), [])
  const add = useCallback(() => setCount(count => count - 1), [])
  return {
    count,
    ces,
    add,
    del,
    setTest,
    test,
  }
}
export default createModel(useCounterModel)
