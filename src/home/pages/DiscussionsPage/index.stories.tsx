import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import DiscussionsPage from '.';

export default {
  title: 'Pages/DiscussionsPage',
  component: DiscussionsPage,
} as Meta;

export const Primary: React.VFC = () => <DiscussionsPage />;
