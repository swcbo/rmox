import { useRef } from 'react'
/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-26 17:08:50
 */
import { useCallback, useState } from 'react'
import { createModel } from '../../../src/index'
const data = () => 3
const useCounterModel = () => {
  const ces = useRef(data())
  const [count, setCount] = useState(1)
  const [test, setTest] = useState(1)
  const del = useCallback(() => setCount(count => count - 1), [])
  const add = useCallback(() => setCount(count => count + 1), [])
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
