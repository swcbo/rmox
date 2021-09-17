import { ModelObj } from 'src/rmox';
export default class CreateObserver<T extends ModelObj> {
    listeners: {
        [key: string]: (state: T) => void;
    };
    state: T | undefined;
    setState: (state: T | undefined) => void;
    dispatch: (state: T) => void;
    subscribe: (fun: (state: T) => void) => () => void;
}
