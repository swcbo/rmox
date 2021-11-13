import React, { FC, useEffect } from 'react'
import Rmox from '../core/rmox'
import useUpdate from '../hooks/useUpdate'
const rmox = Rmox.getInstance()
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
