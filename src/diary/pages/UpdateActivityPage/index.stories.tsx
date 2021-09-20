import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import UpdateActivityPage from '.';

export default {
  title: 'Pages/UpdateActivityPage',
  component: UpdateActivityPage,
} as Meta;

export const Default: React.VFC = () => <UpdateActivityPage />;
