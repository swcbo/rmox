import React, { memo } from 'react'
import { FC } from 'react'
import useCounterModel from '../../models/useCounterModel'
import Test from './test'

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 22:31:33
 * @LastEditors: 小白
 * @LastEditTime: 2022-02-08 00:26:17
 */
const Counter: FC<{ className?: string }> = className => {
  const { del, add, setTest } = useCounterModel()
  console.log('Counter render', className)
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
      <button onClick={() => setTest(d => d + 1)}>?</button>
    </>
  )
}
export default memo(Counter)
