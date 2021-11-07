import { Component } from 'react'
import type { ComponentType, FC } from 'react';
import type {
  ExecutedRes,
  ModelType,
  Model,
  ComponentProps,
} from 'src/typing'
import type { TransForm, FinalProps } from 'src/typing/connect';

function connect<T extends ModelType, P extends ComponentProps, K = string>(
  models: T,
  mergeToProps: TransForm<T extends Model ? [T] : T, P, K>,
) {
  return (C: ComponentType<any>) => {
    const Wrapper: FC<FinalProps<T extends Model ? [T] : T, P, K>> = p => {
      return <C {...p} />
    }
    return class D extends Component<any> {
      render() {
        const transform = Array.isArray(models) ? models : [models];
        const _props = this.props;
        const next = [] as unknown as ExecutedRes<T extends Model ? [T] : T>;
        transform.forEach(i => {
          (next as any).push(i())
        });
        const props = mergeToProps(next, _props as P);
        return (
          <Wrapper
            {...(props)}
          />
        )
      }
    }
  }
}

export default connect;