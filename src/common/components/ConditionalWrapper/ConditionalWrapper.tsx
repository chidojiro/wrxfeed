import React from 'react';
import { Children } from '@/common/types';

type Component<T> = ((props: T) => React.ReactNode) | string;

type BaseConfigOptions<TProps> = {
  component: Component<TProps>;
  props?: TProps;
};

type IfConfig<TProps> = BaseConfigOptions<TProps> & {
  condition: boolean;
};

type ElseConfig<TProps> = BaseConfigOptions<TProps>;

export type ConditionalWrapperProps<TIf, TElse> = Children & {
  if: IfConfig<TIf>;
  else?: ElseConfig<TElse>;
} & Record<string, any>;

export const ConditionalWrapper = <TIf, TElse>({
  if: If,
  else: Else,
  children,
  ...restProps
}: ConditionalWrapperProps<TIf, TElse>) => {
  if (If.condition) {
    return (
      <If.component {...(If.props as any)} {...restProps}>
        {children}
      </If.component>
    );
  }

  if (Else) {
    return (
      <Else.component {...(Else.props as any)} {...restProps}>
        {children}
      </Else.component>
    );
  }

  return <>{children}</>;
};
