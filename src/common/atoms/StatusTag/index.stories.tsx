import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import StatusTag, { STATUS, StatusTagProps } from '.';

export default {
  title: 'Atoms/StatusTag',
  component: StatusTag,
} as Meta;

const Template: Story<StatusTagProps> = (args) => {
  const { status } = args;
  return <StatusTag status={status} />;
};

export const Default = Template.bind({});
Default.args = { status: STATUS.NEW };
