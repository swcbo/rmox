/*
 * @Descripttion:
 * @version:
 * @Author: 小白
 * @Date: 2021-09-19 16:02:04
 * @LastEditors: 小白
 * @LastEditTime: 2021-09-19 17:51:51
 */
import { FC } from 'react';
import Observer from '../helpers/observer';

export default class Rmox {
  static _instance: Rmox | null = null;
  // store集合
  store: { [key: string]: Observer<any> } = {};
  // 全局model集合
  globalModel: FC<any>[] = [];
  public static getInstance() {
    if (Rmox._instance === null) {
      Rmox._instance = new Rmox();
    }
    return Rmox._instance!;
  }
}
