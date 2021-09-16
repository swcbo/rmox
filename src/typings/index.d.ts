import CreateObserver from '../helpers/observer';
export type ModelObj = { [key: string]: any };
export type ModelHooks<T extends ModelObj, P> = (args?: P) => T;
export type Dep<T> = (keyof T)[];
export interface LocalModel<T extends ModelObj> {
  (depFn?: Dep<T>): T;
  Provider: React.FC;
  getState: () => T;
}
declare global {
  interface Window {
    localModelStore: { [key: string]: CreateObserver<any> };
  }
}
