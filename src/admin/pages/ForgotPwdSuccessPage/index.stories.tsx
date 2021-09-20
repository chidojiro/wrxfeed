import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ForgotPwdSuccessPage from '.';

export default {
  title: 'Pages/ForgotPwdSuccessPage',
  component: ForgotPwdSuccessPage,
} as Meta;

export const Default: React.VFC = () => <ForgotPwdSuccessPage />;
