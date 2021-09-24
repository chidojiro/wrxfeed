import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CommentRemaining, { CommentRemainingProps } from '.';

export default {
  title: 'Atoms/CommentRemaining',
  component: CommentRemaining,
} as Meta;

const Template: Story<CommentRemainingProps> = (args) => {
  return <CommentRemaining {...args} />;
};

export const Default = Template.bind({});
Default.args = { hiddenCount: 7 };
