import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import MainLayout from '.';

export default {
  title: 'Templates/MainLayout',
  component: MainLayout,
} as Meta;

export const Default: React.VFC = () => (
  <MainLayout companyName="Test Page">
    {[...new Array(12)]
      .map(
        () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
      )
      .join('\n')}
  </MainLayout>
);
