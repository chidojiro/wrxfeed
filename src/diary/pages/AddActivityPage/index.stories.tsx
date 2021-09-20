import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import AddActivityPage from '.';

export default {
  title: 'Pages/AddActivityPage',
  component: AddActivityPage,
} as Meta;

export const Default: React.VFC = () => <AddActivityPage />;
