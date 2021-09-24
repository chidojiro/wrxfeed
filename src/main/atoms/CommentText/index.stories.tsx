import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CommentText, { CommentTextProps } from '.';

export default {
  title: 'Atoms/CommentText',
  component: CommentText,
} as Meta;

const Template: Story<CommentTextProps> = (args) => {
  const { content } = args;
  return <CommentText content={content} />;
};

export const Default = Template.bind({});
Default.args = {
  content: '<mention userid="123" tagname="An Tram" />Of course! We’ll ramp up for the Q4 push.',
};
