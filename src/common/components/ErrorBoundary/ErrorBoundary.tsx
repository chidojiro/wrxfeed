import { Children } from '@/common/types';
import React from 'react';
import { SomethingWentWrong } from '../SomethingWentWrong';

export type ErrorBoundaryProps = Children & {
  //
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { error?: Error }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render(): JSX.Element {
    if (this.state.error) {
      return <SomethingWentWrong />;
    }

    return <>{this.props.children}</>;
  }
}
