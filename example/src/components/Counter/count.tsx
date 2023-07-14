import React, { memo } from 'react'
import useCounterModel from '../../models/useCounterModel'

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 09:55:41
 * @LastEditors: 小白
 * @LastEditTime: 2021-11-29 22:53:36
 */
const Count = () => {
  const { count } = useCounterModel()
  console.log('Count render', count)
  return (
    <>
      <div style={{ fontSize: 30 }}>个数：{count.a}</div>
      {/* <div>{ces?.current}</div> */}
    </>
  )
}
export default memo(Count)
