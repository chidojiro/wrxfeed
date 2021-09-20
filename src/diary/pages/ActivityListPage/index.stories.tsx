import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ActivityListPage from '.';

export default {
  title: 'Pages/ActivityListPage',
  component: ActivityListPage,
} as Meta;

export const Default: React.VFC = () => <ActivityListPage />;
