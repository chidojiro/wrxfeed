import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ResetPwdPage from '.';

export default {
  title: 'Pages/ResetPwdPage',
  component: ResetPwdPage,
} as Meta;

export const Default: React.VFC = () => <ResetPwdPage />;
