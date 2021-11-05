import React from 'react'
import useMoneyModel from '../../models/useMoneyModel'
import connect from '../../../../src/core/connect'

@connect([useMoneyModel], ([money]) => () => ({
  money: money.money,
}))
export default class Test extends React.Component {
  render() {
    const { money } = this.props
    return <>{money}</>
  }
}
