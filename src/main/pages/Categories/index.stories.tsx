import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import CategoriesPage from '.';

export default {
  title: 'Pages/CategoriesPage',
  component: CategoriesPage,
} as Meta;

export const Default: React.FC = () => <CategoriesPage />;
