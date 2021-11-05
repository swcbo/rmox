import React from 'react'
import useMoneyModel from '../../models/useMoneyModel'
import useUserModel from '../../models/useUserModel'
import connect, { FinalProps } from '../../../../src/core/connect'

const Models = [useMoneyModel, useUserModel] as const;

@connect<typeof Models, {}>(
  [useMoneyModel, useUserModel],
  ([money, user]) =>
    props => ({
      age: user.age,
      money: money.money,
    }),
)
export default class Test extends React.Component<any> {
  render() {
    const { age, money } = this.props
    return (
      <>
        {money} / {age}
      </>
    )
  }
}
