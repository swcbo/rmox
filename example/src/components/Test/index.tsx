import React from 'react';
import connect from '../../../../src/helpers/connect';
import useMoneyModel from '../../models/useMoneyModel';
import useUserModel from '../../models/useUserModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-23 23:40:17
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-26 16:43:21
 */
class Test extends React.Component<any, any> {
  render() {
    const { age, money } = this.props;
    return (
      <>
        {money} / {age}
      </>
    );
  }
}

// export default connect([useUserModel, useMoneyModel], ([age, money]) => ({
//   age: age.age,
//   money: money.money,
// }))(Test);
export default Test;
