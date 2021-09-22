import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import OverviewPage from '.';

export default {
  title: 'Pages/OverviewPage',
  component: OverviewPage,
} as Meta;

export const Primary: React.VFC = () => <OverviewPage />;
