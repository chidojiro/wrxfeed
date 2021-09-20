import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import ProfilePage from '.';

export default {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
} as Meta;

export const Default: React.VFC = () => <ProfilePage />;
