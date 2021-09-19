[English](./README.md) | 简体中文

<p align="center">
    <img width="80" src="./doc/logo.svg" alt="rmox logo">
</p>
<br/>
<p align="center">
 <a href="https://travis-ci.com/q1104133609/rmox"><img src="https://app.travis-ci.com/q1104133609/rmox.svg?branch=main" alt="npm package"></a>
  <a href="https://npmjs.com/package/rmox"><img src="https://img.shields.io/npm/v/rmox.svg?logo=npm" alt="npm package"></a>
  <a href="https://bundlephobia.com/package/rmox@latest"><img src="https://img.shields.io/bundlephobia/min/rmox.svg?logo=typescript" alt="size"></a>
  <img src="https://img.shields.io/npm/dependency-version/rmox/peer/react?logo=react" alt="react version">
</p>
<br/>
<img  src="./doc/textlogo.svg" alt="rmox logo" height="60">

> React Hook 状态机

- 支持全局与局部状态管理(局部状态管理退出即销毁)
- 使用自定义 Hook 定义 model
- render 优化(只有绑定的数据改变才会触发 render)
- 支持 全局 model 以及局部 model

# 在线预览

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/heuristic-hill-356xk)

# 安装

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
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { GlobalProvider } from 'rmox';
import App from './App';
const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  rootElement,
);
```

### 创建 modelHook

> 通过`createModel`创建一个 `modelHook ` 第二个参数为 `storeName`方便通过 `RmoxInstantce` 在任何位置查看以及获取 `model` 内容,第三个参数为是否为全局 model

```tsx
const useUserModel = () => {
  const [age, setAge] = useState(0);
  const addAge = () => setAge((age) => age + 1);
  return { addAge, age };
};
export default createModel(useUserModel, 'user', true);
```

### 组件内使用 modelHook

> 在任何组件中直接调用 `modelHook` ，可以直接获取 model 内容。

```tsx
import useUserModel from '../models/useUserModel';
const App = () => {
  const { age, addAge } = useUserModel();
  return (
    <>
      <button onClick={addAge}>+</button>
      {age}
    </>
  );
};
```

## 局部(模块) model

### 创建一个 modelHook

> 通过`createModel`创建一个 `modelHook `

```tsx
import { useState } from 'react';
import { createModel } from 'rmox';
const useCounterModel = () => {
  const [count, setCount] = useState(0);
  const del = () => setCount(count - 1);
  const add = () => setCount(count + 1);
  console.log(count);
  return {
    count,
    add,
    del,
  };
};
export default createModel(useCounterModel, 'counter');
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
      <useCounterModel.Provider>
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
import React from 'react';
import useCounterModel from '../../models/useCounterModel';
const Count = () => {
  const { count } = useCounterModel();
  return (
    <>
      <div>Count：{count}</div>
    </>
  );
};
export default Count;
```

### 调用 model 方法

>

```tsx
import React from 'react';
import useCounterModel from '../../models/useCounterModel';

const Counter = () => {
  const { del, add } = useCounterModel();
  return (
    <>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
    </>
  );
};
export default Counter;
```

# 更多用法

## modelHook 依赖调用

> 在实际开发过程中多多少少会存在定义的模块之间的依赖管理,在`rmox`中局部和全局 model 都支持各个`modelHook`之间依赖`当然还需要小心循环依赖的问题`

```tsx
import { useState } from 'react';
import { createModel } from 'rmox';
import useUserModel from './useUserModel';

const useMoneyModel = () => {
  const [money, setMoney] = useState(100);
  const { addAge } = useUserModel();
  const addMoney = () => setMoney((money) => money + 1);
  return { addMoney, money, addAge };
};
export default createModel(useMoneyModel, 'money', true);
```

## Rmox 全局单利(支持对 model 获取以及修改)

> 在实际过程中可能在不是组件的环境中需要获取到`modelHook`内容,`rmox`提供了单利可支持任何环境中中直接修改和查看指定 model 的内容

```tsx
import { RmoxInstantce } from 'rmox';
// 指定model(storeName)
const counter = RmoxInstantce['counter'].
// model内容
const counterState = counter.state;
// 直接修改内容
counter.dispatch({...counterState,count:10})
```

# API 介绍

## createModel(创建 model)

| 参数      | 描述                                  | 默认  | 必填 |
| --------- | ------------------------------------- | ----- | ---- |
| useHook   | 具体的 `modelHook`                    | --    | 是   |
| storeName | model 名称,使用单利查询内容的时候用到 | --    | 是   |
| global    | 是否是全局                            | false | 否   |

## RmoxInstantce(remox 单利)

> 是一个 model 的集合,key 为`modelHook`的`storeName`,可以直接获取`modelHook`与操作内部内容

## GlobalProvider(全局提供者)

> 全局 model 必须配置到入口
