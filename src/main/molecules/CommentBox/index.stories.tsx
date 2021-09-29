import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import CommentBox from '.';

export default {
  title: 'Atoms/CommentBox',
  component: CommentBox,
} as Meta;

const Template: Story = () => {
  return <CommentBox onSubmit={() => undefined} />;
};

export const Default = Template.bind({});
