import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import BlankLayout from '.';

export default {
  title: 'Templates/BlankLayout',
  component: BlankLayout,
} as Meta;

export const Default: React.VFC = () => (
  <BlankLayout title="Test Page">
    {[...new Array(12)]
      .map(
        () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
      )
      .join('\n')}
  </BlankLayout>
);
