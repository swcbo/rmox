import Observer from '../helpers/observer';
import useModel from '../hooks/useModel';
import Rmox from './rmox';
import Provider from '../provider';
const rmoxStore = Rmox.getInstance().store;
export type ModelObj = { [key: string]: any };
const createModel = <P, T extends ModelObj>(
  useHook: (init?: P) => T,
  global = false,
) => {
  const name = useHook.name;
  if (!rmoxStore[name]) {
    rmoxStore[name] = new Observer<T>();
  }
  const observer = rmoxStore[name];
  const provider = Provider<T, P>(observer, useHook);
  if (global) {
    Rmox.getInstance().globalModel.unshift(provider);
  }
  return useModel<T, P>(observer, provider, name);
};

export { createModel };
