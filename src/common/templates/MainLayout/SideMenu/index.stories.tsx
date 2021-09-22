import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SideMenu from '.';

export default {
  title: 'Organisms/SideMenu',
  component: SideMenu,
} as Meta;

const Template: Story = () => {
  return <SideMenu />;
};

export const Default = Template.bind({});
