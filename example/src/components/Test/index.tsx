import React from 'react';
import connect from '../../../../src/helpers/connect';
import useUserModel from '../../models/useUserModel';

/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-23 23:40:17
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-23 23:54:20
 */
class Test extends React.Component<any, any> {
  render() {
    console.log(this.props);
    const { age } = this.props;
    return <>{age}</>;
  }
}

export default connect(useUserModel)(Test);
