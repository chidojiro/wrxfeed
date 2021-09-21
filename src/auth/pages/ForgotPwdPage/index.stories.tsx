import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ForgotPwdPage from '.';

export default {
  title: 'Pages/ForgotPwdPage',
  component: ForgotPwdPage,
} as Meta;

export const Default: React.VFC = () => <ForgotPwdPage />;
