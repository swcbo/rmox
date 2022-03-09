import { useRef } from 'react'
/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:27:18
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-06 15:07:09
 */
import { useCallback, useState } from 'react'
import { createModel } from '../../../src/index'
import { useCounterModel } from './useCounterModel'
const useCounterBModel = (value?: number) => {
  const { add, del, count } = useCounterModel(value)
  // const [count, setCount] = useState(CustomCount)
  // const [test, setTest] = useState(1)
  //   const del = useCallback(() => setCount(count => count - 1), [])
  //   const add = useCallback(() => setCount(count => count - 1), [])
  console.log('>>>>', 'useCounterBModel', count)
  return {
    count,
    add,
    del,
  }
}
export default createModel(useCounterBModel)
