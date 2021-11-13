import type { ModelObj } from '../typing'

export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob())
  const uuId = tempUrl.toString()
  URL.revokeObjectURL(tempUrl)
  return uuId.substr(uuId.lastIndexOf('/') + 1)
}
// 是否是对象
const isObject = (obj: any) => {
  return typeof obj === 'object' && obj !== null
}
// 是否是方法
const isFunction = (obj: any) => {
  return typeof obj === 'function' && obj !== null
}
// 获取对象里面的指定值
export const pick = (obj: ModelObj, arr: string[]) =>
  arr.reduce(
    (iter: ModelObj, val) => (val in obj && (iter[val] = obj[val]), iter),
    {},
  )

// 判断对象是否相等
export const isEqual = (old: ModelObj, now: ModelObj) => {
  if (isFunction(now) || !isObject(old)) {
    return now === old
  }
  if (old === now) {
    return true
  }
  if (!old || !now || Object.keys(old).length !== Object.keys(now).length) {
    return false
  }
  for (let key in old) {
    if (!isEqual(old[key], now[key])) {
      return false
    }
  }
  return true
}

// 获取store里面指定值
export const pickStore = <T extends ModelObj>(deps: string[], state: T) =>
  deps.length === 0 ? state || {} : pick(state, deps)
