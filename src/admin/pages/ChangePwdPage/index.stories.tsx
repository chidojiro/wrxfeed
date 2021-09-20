import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ChangePwdPage from '.';

export default {
  title: 'Pages/ChangePwdPage',
  component: ChangePwdPage,
} as Meta;

export const Default: React.VFC = () => <ChangePwdPage />;
