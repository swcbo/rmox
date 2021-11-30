import React from 'react'
import { connect } from '../../../../src'
import { FinalProps } from '../../../../src/typing/connect'
import useMoneyModel from '../../models/useMoneyModel'
import useUserModel from '../../models/useUserModel'

const Models = [useMoneyModel, useUserModel] as const

type C = FinalProps<typeof Models, {}, 'age' | 'money'>
// typescript is not good for support Decorator
// @connect(Models, ([money, user]) => props => ({
//   age: user.age,
//   money: money.money,
// }))
// class Test extends React.Component {
//   render() {
//     const { age, money } = this.props
//     return (
//       <>
//         {money} / {age}
//       </>
//     )
//   }
// }

export default connect(Models, ([money, user], props) => ({
  age: user.age,
  money: money.money,
}))(
  class Test extends React.Component<C> {
    render() {
      const { age, money } = this.props
      return (
        <>
          {money} / {age}
        </>
      )
    }
  },
)
