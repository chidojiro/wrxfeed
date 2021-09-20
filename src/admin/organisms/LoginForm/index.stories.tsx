import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import LoginForm, { LoginFormProps } from '.';

export default {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<LoginFormProps> = (args) => {
  const { onSubmit } = args;
  return <LoginForm onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
