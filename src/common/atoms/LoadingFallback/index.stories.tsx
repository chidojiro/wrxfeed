import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import LoadingFallback from '.';

export default {
  title: 'Atoms/LoadingFallback',
  component: LoadingFallback,
} as Meta;

export const Default: React.FC = () => <LoadingFallback />;
