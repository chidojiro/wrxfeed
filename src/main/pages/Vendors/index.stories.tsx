import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import VendorsPage from '.';

export default {
  title: 'Pages/VendorsPage',
  component: VendorsPage,
} as Meta;

export const Default: React.VFC = () => <VendorsPage />;
