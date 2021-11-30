import React from 'react'
import { connect } from '../../../../src'
import { FinalProps } from '../../../../src/typing/connect'
import useMoneyModel from '../../models/useMoneyModel'

// typescript is not good for support Decorator
// @connect(useMoneyModel, ([money]) => ({
//   money: money.money,
// }))
// class Test extends React.Component {
//     render() {
//       const { money } = this.props
//       return <>{money}</>
//     }
//   }
// );

class Test extends React.Component<
  FinalProps<[typeof useMoneyModel], {}, 'money'>
> {
  render() {
    const { money } = this.props
    return <>{money}</>
  }
}
export default connect(useMoneyModel, ([money]) => ({
  money: money.money,
}))(Test)
