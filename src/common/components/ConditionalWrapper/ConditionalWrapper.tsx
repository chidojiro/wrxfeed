import React, { ReactNode } from 'react';

export type ConditionalWrapperProps<T> = {
  active?: boolean;
  children: ReactNode;
} & ({ component: (props: T) => JSX.Element } & T);

export const ConditionalWrapper = <T,>({
  active,
  component,
  children,
  ...componentProps
}: ConditionalWrapperProps<T>) => {
  if (!active) return <>{children}</>;

  const Component = component as any;

  return <Component {...componentProps}>{children}</Component>;
};
