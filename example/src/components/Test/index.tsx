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
 * @LastEditTime: 2021-09-27 10:15:46
 */
// const withLog = (Comp: any) => {
//   return (props: any) => <Comp {...props}></Comp>;
// };
// function Component<T extends { new (...args: any[]): any }>(component: T) {
//   // 泛型限定
//   return class extends component {
//     handleClick() {
//       // 劫持onClick
//       super.handleClick();
//       console.log('child clicked');
//     }
//     render() {
//       const parent = super.render();
//       // 劫持onClick
//       return React.cloneElement(parent, { onClick: this.handleClick });
//     }
//   };
// }
// @Component
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

export default Test;
