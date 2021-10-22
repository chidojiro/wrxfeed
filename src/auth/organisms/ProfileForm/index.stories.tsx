import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ProfileForm, { ProfileFormProps } from '.';

export default {
  title: 'Organisms/ProfileForm',
  component: ProfileForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ProfileFormProps> = (args) => {
  const { defaultValues, onSubmit } = args;
  return <ProfileForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
Default.args = {
  defaultValues: {
    firstName: 'John Doe',
  },
};
