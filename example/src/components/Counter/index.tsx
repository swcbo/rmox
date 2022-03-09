import React, { memo } from 'react'
import { FC } from 'react'
import useCounterBModel from '../../models/useCounterBModel'
import useCounterModel from '../../models/useCounterModel'

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:31:33
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-06 15:21:44
 */
const Counter: FC<{ className?: string }> = className => {
  const { del, count, add } = useCounterModel()
  // const { count, add, del } = useCounterBModel()
  console.log('Counter render', className)
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
      {/* <button onClick={() => setTest(d => d + 1)}>?</button> */}
      <span>B{count}</span>
    </>
  )
}
export default memo(Counter)
