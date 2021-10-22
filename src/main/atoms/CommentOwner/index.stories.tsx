import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CommentOwner, { CommentOwnerProps } from '.';

export default {
  title: 'Atoms/CommentOwner',
  component: CommentOwner,
} as Meta;

const Template: Story<CommentOwnerProps> = (args) => {
  return <CommentOwner {...args} />;
};

export const Default = Template.bind({});
Default.args = { owner: { fullName: 'An Tran' }, commentDate: Date.now().toString() };
