import { FC } from 'react';
import Observer from '../helpers/observer';
export default class Rmox {
  static _instance: Rmox | null = null;
  store: { [key: string]: Observer<any> } = {};
  globalModel: FC<any>[] = [];
  public static getInstance() {
    if (Rmox._instance === null) {
      Rmox._instance = new Rmox();
    }
    return Rmox._instance!;
  }
}
