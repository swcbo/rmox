/*
 * @Author: swcbo
 * @Date: 2021-11-13 18:15:27
 * @LastEditors: swcbo
 * @LastEditTime: 2022-08-01 11:37:54
 * @FilePath: /rmox/src/provider/GlobalProvider.tsx
 * @Description:
 */
import React, { FC, ReactNode, useEffect } from 'react'
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
const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Wrapper />
    {children}
  </>
)
export default GlobalProvider
