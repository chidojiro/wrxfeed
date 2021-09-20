import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ActivityEditForm, { ActivityEditFormProps } from '.';

export default {
  title: 'Containers/ActivityEditForm',
  component: ActivityEditForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ActivityEditFormProps> = (args) => {
  const { onSubmit } = args;
  return <ActivityEditForm onSubmit={onSubmit} activityId="1123" />;
};

export const Default = Template.bind({});
