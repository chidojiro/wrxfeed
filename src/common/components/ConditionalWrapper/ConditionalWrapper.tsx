import React from 'react';
import { Children } from '@/common/types';

type Component<T> = ((props: T) => JSX.Element) | string;

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
};

export const ConditionalWrapper = <TIf, TElse>({
  if: If,
  else: Else,
  children,
}: ConditionalWrapperProps<TIf, TElse>) => {
  if (If.condition) {
    return <If.component {...(If.props as any)}>{children}</If.component>;
  }

  if (Else) {
    return <Else.component {...(Else.props as any)}>{children}</Else.component>;
  }

  return <>{children}</>;
};
