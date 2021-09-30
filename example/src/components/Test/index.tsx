import React from 'react'
import useMoneyModel from '../../models/useMoneyModel'
import useUserModel from '../../models/useUserModel'
import connect from '../../../../src/core/connect'
@connect([useMoneyModel, useUserModel], ([money, user]) => ({
  age: user.age,
  money: money.money,
}))
export default class Test extends React.Component<any, any> {
  render() {
    console.log('>_____')
    const { age, money } = this.props
    return (
      <>
        {money} / {age}
      </>
    )
  }
}
