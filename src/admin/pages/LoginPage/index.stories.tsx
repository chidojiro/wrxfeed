import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import LoginPage from '.';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as Meta;

export const Default: React.VFC = () => <LoginPage />;
