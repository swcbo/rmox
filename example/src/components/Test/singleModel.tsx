import React from 'react'
import useMoneyModel from '../../models/useMoneyModel'
import connect, { FinalProps } from '../../../../src/core/connect'

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


export default connect(useMoneyModel, ([money]) => ({
  money: money.money,
}))(
  class Test extends React.Component<
    FinalProps<[typeof useMoneyModel], {}, 'money'>
  > {
    render() {
      const { money } = this.props
      return <>{money}</>
    }
  },
)

