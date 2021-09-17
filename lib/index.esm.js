import { jsx, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-16 22:49:34
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-17 00:07:59
 */
const uuid = () => {
    const tempUrl = URL.createObjectURL(new Blob());
    const uuId = tempUrl.toString();
    URL.revokeObjectURL(tempUrl);
    return uuId.substr(uuId.lastIndexOf('/') + 1);
};
//实现
//判断是否是对象或数组
const isObject = (obj) => {
    return typeof obj === 'object' && obj !== null;
};
const pick = (obj, arr) => arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
const isEqual = (obj1, obj2) => {
    // 两个数据有任何一个不是对象或数组
    if (!isObject(obj1) || !isObject(obj2)) {
        // 值类型(注意：参与equal的一般不会是函数)
        return obj1 === obj2;
    }
    // 如果传的两个参数都是同一个对象或数组
    if (obj1 === obj2) {
        return true;
    }
    // 两个都是对象或数组，而且不相等
    // 1.先比较obj1和obj2的key的个数，是否一样
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    // 如果key的个数相等,就是第二步
    // 2.以obj1为基准，和obj2依次递归比较
    for (let key in obj1) {
        // 比较当前key的value  --- 递归
        const res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return false;
        }
    }
    // 3.全相等
    return true;
};

class CreateObserver {
    listeners = {};
    state;
    setState = (state) => {
        this.state = state;
    };
    dispatch = (state) => {
        this.state = state;
        Object.values(this.listeners).forEach((fun) => fun(state));
    };
    subscribe = (fun) => {
        const id = uuid();
        this.listeners[id] = fun;
        return () => {
            delete this.listeners[id];
        };
    };
}

// check obj diff
const checkFunDependBackState = (depFn, state) => depFn.length === 0 ? state || {} : pick(state, depFn);
// set global localModelStore
if (!window.localModelStore) {
    window.localModelStore = {};
}
const createLocalModel = (useCustomizedHook, storeName = '') => {
    if (!window.localModelStore[storeName]) {
        window.localModelStore[storeName] = new CreateObserver();
    }
    const observer = window.localModelStore[storeName];
    let isInitModel = true;
    // provider
    const Provider = ({ children, init }) => {
        // custom hooks bind
        const hookState = useCustomizedHook(init);
        // hot reload (create -> unmount -> mount)
        const isInit = useRef(true);
        if (!observer.state) {
            observer.setState(hookState);
        }
        // listener change
        useEffect(() => {
            if (!isInit.current) {
                observer.dispatch(hookState);
            }
            isInit.current = false;
        }, [hookState]);
        // clean current state
        useEffect(() => {
            isInitModel = false;
            return () => {
                if (!isInitModel) {
                    observer.setState(undefined);
                }
            };
        }, []);
        // eslint-disable-next-line react/react-in-jsx-scope
        return jsx(Fragment, { children: children }, void 0);
    };
    // model
    const useLocalModel = () => {
        const [currentState, setCurrentState] = useState((observer.state || {}));
        const depsFnRef = useRef([]);
        // collect bind field
        const isInit = useRef(false);
        if (!isInit.current) {
            Object.keys(currentState).forEach((v) => {
                const value = currentState[v];
                Object.defineProperty(currentState, v, {
                    get: function () {
                        if (!depsFnRef.current.includes(v)) {
                            depsFnRef.current.push(v);
                        }
                        return value;
                    },
                });
            });
        }
        const depsRef = useRef(checkFunDependBackState(depsFnRef.current, currentState));
        isInit.current = true;
        useEffect(() => {
            const unsubscribe = observer.subscribe((nextState) => {
                if (!depsFnRef.current) {
                    setCurrentState(nextState);
                    return;
                }
                const oldDeps = depsRef.current;
                const newDeps = checkFunDependBackState(depsFnRef.current, nextState);
                if (!isEqual(oldDeps, newDeps)) {
                    setCurrentState(nextState);
                }
                depsRef.current = newDeps;
            });
            return () => {
                unsubscribe();
            };
        }, []);
        return currentState;
    };
    useLocalModel.Provider = Provider;
    useLocalModel.getState = () => observer.state;
    return useLocalModel;
};

export { createLocalModel as default };
