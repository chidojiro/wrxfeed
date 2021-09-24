import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TokenizedText from '.';

export default {
  title: 'Atoms/TokenizedText',
  component: TokenizedText,
} as Meta;

const Template: Story = (args) => {
  const { text } = args;
  return <TokenizedText>{text}</TokenizedText>;
};

export const Default = Template.bind({});
Default.args = { text: 'An Tran' };
