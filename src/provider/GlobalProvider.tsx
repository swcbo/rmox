import React, { FC, useEffect } from 'react'
import rmox from '../core/rmox'
import useUpdate from '../hooks/useUpdate'
const Wrapper: FC = () => {
  const update = useUpdate()
  useEffect(() => {
    rmox.observer.subscribe(() => {
      update()
    })
  }, [update])
  return (
    <>
      {[...rmox.globalModel.values()].map((V: FC<any>, index) => (
        <V key={index} />
      ))}
    </>
  )
}
const GlobalProvider: FC = ({ children }) => (
  <>
    <Wrapper />
    {children}
  </>
)
export default GlobalProvider
