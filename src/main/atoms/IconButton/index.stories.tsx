import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { ButtonProps } from '@mui/material';
import IconButton from '.';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<ButtonProps> = () => {
  return <IconButton />;
};

export const Default = Template.bind({});
