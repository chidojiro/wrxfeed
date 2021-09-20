import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Sidebar from '.';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story = () => {
  return <Sidebar />;
};

export const Default = Template.bind({});
