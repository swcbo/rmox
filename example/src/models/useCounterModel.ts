import { useRef } from 'react'
/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: 小白
 * @LastEditTime: 2021-12-07 22:23:20
 */
import { useCallback, useState } from 'react'
import { createModel } from '../../../src/index'
const data = () => 3
const useCounterModel = (value?: number) => {
  const ces = useRef(data())
  const [count, setCount] = useState(value || 1)
  const [test, setTest] = useState(1)
  const del = useCallback(() => setCount(count => count - 1), [])
  const add = useCallback(() => setCount(count => count - 1), [])
  console.log('>>>>', 'useCounterModel')
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
