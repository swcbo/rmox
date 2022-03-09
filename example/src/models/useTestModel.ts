/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-21 10:01:08
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-04 23:07:58
 */
import { useState } from 'react'
import { createModel } from '../../../src/index'
import useUserModel from './useUserModel'

const useTestModel = () => {
  const { addAge } = useUserModel()
  const [test, setTest] = useState(0)
  const addTest = () => setTest(test => test + 1)
  return { addTest, addAge, test }
}
export default createModel(useTestModel, { global: true })
