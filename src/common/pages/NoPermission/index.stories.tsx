import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import NoPermission from '.';

export default {
  title: 'Pages/NoPermission',
  component: NoPermission,
} as Meta;

export const Primary: React.FC = () => <NoPermission />;
