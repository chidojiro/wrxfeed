import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Comment } from '@/main/entity';
import CommentItem, { CommentItemProps } from '.';

export default {
  title: 'Molecules/CommentItem',
  component: CommentItem,
} as Meta;

const Template: Story<CommentItemProps> = (args) => {
  const { comment } = args;
  return <CommentItem comment={comment} />;
};

export const Default = Template.bind({});
const comment: Comment = {
  id: 1,
  user: {
    fullName: 'Professional Services',
  },
  createdAt: new Date().toISOString(),
  content: 'Of course! We’ll ramp up for the Q4 push.',
};
Default.args = { comment };
