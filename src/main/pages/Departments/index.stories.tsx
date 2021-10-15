import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import DepartmentsPage from '.';

export default {
  title: 'Pages/DepartmentsPage',
  component: DepartmentsPage,
} as Meta;

export const Default: React.VFC = () => <DepartmentsPage />;
