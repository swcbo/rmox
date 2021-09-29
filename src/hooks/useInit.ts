import { useEffect, useRef } from 'react'
const useInit = (fun: () => void) => {
  const isInit = useRef(true)
  if (isInit.current) {
    fun()
  }
  useEffect(() => {
    isInit.current = false
  }, [])
  return isInit
}

export default useInit
