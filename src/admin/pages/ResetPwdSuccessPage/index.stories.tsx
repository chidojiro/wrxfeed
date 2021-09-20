import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ResetPwdSuccessPage from '.';

export default {
  title: 'Pages/ResetPwdSuccessPage',
  component: ResetPwdSuccessPage,
} as Meta;

export const Default: React.VFC = () => <ResetPwdSuccessPage />;
