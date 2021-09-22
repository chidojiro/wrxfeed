import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import DiscussionPage from '.';

export default {
  title: 'Pages/DiscussionPage',
  component: DiscussionPage,
} as Meta;

export const Default: React.VFC = () => <DiscussionPage />;
