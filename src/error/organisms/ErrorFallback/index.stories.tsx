import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FallbackProps } from 'react-error-boundary';

import ErrorFallback from '.';
import { ApiErrorCode } from '../../types';

export default {
  title: 'Organisms/ErrorFallback',
  component: ErrorFallback,
  argTypes: { resetErrorBoundary: { action: 'onReset' } },
} as Meta;

const Template: Story<FallbackProps> = (args) => {
  const { resetErrorBoundary, error } = args;
  return <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
};

export const Default = Template.bind({});
Default.args = { error: new Error() };

export const NetworkError = Template.bind({});
NetworkError.args = { error: { code: ApiErrorCode.NetworkError } as unknown as Error };

export const Notfound = Template.bind({});
Notfound.args = { error: { code: ApiErrorCode.Notfound } as unknown as Error };

export const Forbidden = Template.bind({});
Forbidden.args = { error: { code: ApiErrorCode.Forbidden } as unknown as Error };

export const ServerError = Template.bind({});
ServerError.args = { error: { code: ApiErrorCode.ServerError } as unknown as Error };

export const GatewayTimeout = Template.bind({});
GatewayTimeout.args = { error: { code: ApiErrorCode.GatewayTimeout } as unknown as Error };
