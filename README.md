[English](./README.md) | 简体中文

<p align="center">
    <img width="80" src="./doc/logo.svg" alt="rmox logo">
</p>
<br/>
<p align="center">
 <a href="https://travis-ci.com/swcbo/rmox"><img src="https://app.travis-ci.com/swcbo/rmox.svg?branch=main" alt="npm package"></a>
  <a href="https://npmjs.com/package/rmox"><img src="https://img.shields.io/npm/v/rmox.svg?logo=npm" alt="npm package"></a>
  <a href="https://bundlephobia.com/package/rmox@latest"><img src="https://img.shields.io/bundlephobia/min/rmox.svg?logo=typescript" alt="size"></a>
  <img src="https://img.shields.io/npm/dependency-version/rmox/peer/react?logo=react" alt="react version">
</p>
<br/>
<img  src="./doc/textlogo.svg" alt="rmox logo" height="60">

> React Hook 状态管理器

- 支持全局与局部状态管理(局部状态管理退出即销毁)
- 使用自定义 Hook 定义 model
- render 优化(只有绑定的数据改变才会触发 render)
- 支持 全局 model 以及局部 model

## 在线预览

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/heuristic-hill-356xk)

## 安装

```bash
yarn add rmox
# or
npm install --save rmox
```

# 使用手册

## 全局 model

### 配置 GlobalProvider

> 由于 rmox 全局 model 都是挂载在 App 之上所以需要配置 GlobalProvider `只有需要使用全局model的情况下才需要配置`

```tsx
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { GlobalProvider } from 'rmox'
import App from './App'
const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  rootElement,
)
```

### 创建 modelHook

> 通过`createModel`创建一个 `modelHook `,第二个参数为 对应配置 `global`为是否为全局

```tsx
const useUserModel = (age: number) => {
  const [age, setAge] = useState(age)
  const addAge = () => setAge(age => age + 1)
  return { addAge, age }
}
export default createModel(useUserModel, {
  global: true,
})
```

### 组件内使用 modelHook

> 在任何组件中直接调用 `modelHook` ，可以直接获取 model 内容。

```tsx
import useUserModel from '../models/useUserModel'
const App = () => {
  const { age, addAge } = useUserModel()
  return (
    <>
      <button onClick={addAge}>+</button>
      {age}
    </>
  )
}
```

## 局部(模块) model

### 创建一个 modelHook

> 通过`createModel`创建一个 `modelHook `

```tsx
import { useState } from 'react'
import { createModel } from 'rmox'
const useCounterModel = init => {
  const [count, setCount] = useState(init)
  const del = () => setCount(count - 1)
  const add = () => setCount(count + 1)
  return {
    count,
    add,
    del,
  }
}
export default createModel(useCounterModel)
```

> 由于 rmox 局部 model 需要一个挂载点,使用需要给局部块添加`Provier`

### 绑定模块

```tsx
import React from "react";
import Counter from "./components/Counter";
import Count from "./components/Counter/count";
import useCounter from "./models/useCounter";
import useCounterModel from "./models/useCounterModel";

const App = () => {
  return (
    <div className="App" >
      <useCounterModel.Provider value={10}>
        <Counter />
        <Count />
      </useCounterModel.Provider>
    </div>
  );
}

export default App;
);
```

### 显示 model 内容

> 直接在需要使用`modelHook`内容的的位置使用`useCounterModel`订阅`count被修改时会同步更新,只有modelHook内部中当前使用到的数据改变,才会触发当前组件render`

```tsx
import React from 'react'
import useCounterModel from '../../models/useCounterModel'
const Count = () => {
  const { count } = useCounterModel()
  return (
    <>
      <div>Count：{count}</div>
    </>
  )
}
export default Count
```

### 调用 model 方法

```tsx
import React from 'react'
import useCounterModel from '../../models/useCounterModel'

const Counter = () => {
  const { del, add } = useCounterModel()
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
    </>
  )
}
export default Counter
```

### 在类组件中调用

> 支持用注解绑定(可以绑定多个也可以绑定一个)

```tsx
@connect([useMoneyModel, useUserModel], ([money, user]) => ({
  age: user.age,
  money: money.money,
}))
export default class Test extends React.Component {
  render() {
    const { age, money } = this.props
    return (
      <>
        {money} / {age}
      </>
    )
  }
}
```

```tsx
import React from 'react'
import useCounterModel from '../../models/useCounterModel'

const Counter = () => {
  const { del, add } = useCounterModel()
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
    </>
  )
}
export default Counter
```

# 更多用法

### modelHook 依赖调用

> `rmox`支持模块之间的相互依赖

```tsx
import { useState } from 'react'
import { createModel } from 'rmox'
import useUserModel from './useUserModel'

const useMoneyModel = () => {
  const [money, setMoney] = useState(100)
  const { addAge } = useUserModel()
  const addMoney = () => setMoney(money => money + 1)
  return { addMoney, money, addAge }
}
export default createModel(useMoneyModel, {
  global: true,
})
```

### 在任意位置获取`model`内容以及修改`store`(仅支持全局 model)

> 在实际过程中可能在不是组件的环境中需要获取到`modelHook`内容,`rmox`给 model 对象上附带对应的属性犯法

```tsx
import useUserModel from './useUserModel'
// model内容
const counterState = useUserModel.getData()
// 直接修改内容
useUserModel.getData()?.addAge()
```

# 注意

> 依赖必须为单向流,`禁止循环嵌套`,且全局与局部 model 之间`不允许全局依赖局部model`

## API 介绍

### createModel(创建 model)

| 参数    | 描述               | 默认 | 必填 |
| ------- | ------------------ | ---- | ---- |
| useHook | 具体的 `modelHook` | --   | 是   |
| options | 配置 ·· `global`   |      | 否   |

## GlobalProvider(全局提供者)

> 全局 model 必须配置到入口
