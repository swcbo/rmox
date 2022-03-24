/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-18 08:06:44
 * @LastEditors: swcbo
 * @LastEditTime: 2022-03-24 20:56:06
 */
import React, { lazy, Suspense, useMemo, useState } from 'react'
import Counter from './components/Counter'
import Count from './components/Counter/count'
import './index.css'
import useCounterBModel from './models/useCounterBModel'
// import Test from './components/Test/singleModel'
import useCounterModel from './models/useCounterModel'
import useTestModel from './models/useTestModel'
import useUserModel from './models/useUserModel'
const Todo = lazy(() => import('../src/components/Todo/index'))

function App() {
  const [show, setShow] = useState(true)
  const { addTest, addAge } = useTestModel()
  const [detail, showDetail] = useState(false)
  const { age } = useUserModel()
  const [visible, setVisible] = useState(1)
  const bottomView = useMemo(
    () => (
      <useCounterModel.Provider value="1">
        <Counter />
        <Count />
      </useCounterModel.Provider>
    ),
    [],
  )
  console.log(visible)

  return (
    <div className="App" style={{ fontSize: 30 }}>
      <button
        onClick={() => {
          addAge()
          // useUserModel.getData()?.addAge()
        }}
      >
        隐藏第一个数字
      </button>
      <div>测试局部卸载：</div>
      {show && (
        <useCounterBModel.Provider value={visible}>
          <Counter />
          <Count />
        </useCounterBModel.Provider>
      )}
      <div>测试隔离：</div>
      {bottomView}
      <div>
        年龄：{age}
        <button onClick={addAge}>+</button>
      </div>
      <div>测试全局：</div>
      <Suspense fallback={null}>{detail && <Todo />}</Suspense>
      {/* <Test /> */}
      <button onClick={() => setShow(!show)}>点击显示隐藏局部状态控件</button>
      <button onClick={() => showDetail(!detail)}>点击显示隐藏全局控件</button>
    </div>
  )
}

export default App
