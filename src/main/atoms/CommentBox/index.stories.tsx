import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import EmojiPopover from '.';

export default {
  title: 'Atoms/EmojiPopover',
  component: EmojiPopover,
} as Meta;

const Template: Story = () => {
  return <EmojiPopover />;
};

export const Default = Template.bind({});
