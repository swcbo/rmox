import React from 'react'
import useMoneyModel from '../../models/useMoneyModel'
import useUserModel from '../../models/useUserModel'
import connect, { FinalProps } from '../../../../src/core/connect'

const Models = [useMoneyModel, useUserModel] as const;

type C = FinalProps<typeof Models, {}, 'age' | 'money'>;
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

connect(Models, ([money, user], props) => ({
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