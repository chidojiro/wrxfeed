import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ForgotPwdForm, { ForgotPwdFormProps } from '.';

export default {
  title: 'Organisms/ForgotPwdForm',
  component: ForgotPwdForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ForgotPwdFormProps> = (args) => {
  const { onSubmit } = args;
  return <ForgotPwdForm onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
