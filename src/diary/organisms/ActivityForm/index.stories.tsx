import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ActivityForm, { ActivityFormProps } from '.';

export default {
  title: 'Organisms/ActivityForm',
  component: ActivityForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ActivityFormProps> = (args) => {
  const { defaultValues, onSubmit } = args;
  return <ActivityForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
Default.args = {
  defaultValues: {
    content: '',
    tags: [],
    time: new Date(),
    income: 0,
    outcome: 0,
  },
};
