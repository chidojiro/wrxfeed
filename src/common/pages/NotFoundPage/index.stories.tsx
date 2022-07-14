import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import NotFoundPage from '.';

export default {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
} as Meta;

export const Primary: React.FC = () => <NotFoundPage />;
