import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ProfileEditForm, { ProfileEditFormProps } from '.';

export default {
  title: 'Containers/ProfileEditForm',
  component: ProfileEditForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ProfileEditFormProps> = (args) => {
  const { onSubmit } = args;
  return <ProfileEditForm onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
