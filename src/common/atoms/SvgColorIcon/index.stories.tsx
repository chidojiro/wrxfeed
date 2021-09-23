import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SvgIcon from '.';

export default {
  title: 'Atoms/SvgIcon',
  component: SvgIcon,
} as Meta;

const Template: Story = () => {
  return <SvgIcon />;
};

export const Default = Template.bind({});
