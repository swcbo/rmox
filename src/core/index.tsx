import Observer from '../helpers/observer';
import useModel from '../hooks/useModel';
import Rmox from './rmox';
import Provider from '../provider';
const rmoxStore = Rmox.getInstance().store;
export type ModelObj = { [key: string]: any };
const createModel = <P, T extends ModelObj>(
  useHook: (init?: P) => T,
  storeName: string,
  global = false,
) => {
  if (!rmoxStore[storeName]) {
    rmoxStore[storeName] = new Observer<T>();
  }
  const observer = rmoxStore[storeName];
  const provider = Provider<T, P>(observer, useHook);
  if (global) {
    Rmox.getInstance().globalModel.push(provider);
  }
  return useModel<T, P>(observer, provider);
};

export { createModel };
