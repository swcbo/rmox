import { useState, useCallback } from 'react'
const useUpdate = () => {
  const [_, update] = useState(false)
  return useCallback(() => {
    update((v) => !v)
  }, [])
}
export default useUpdate
