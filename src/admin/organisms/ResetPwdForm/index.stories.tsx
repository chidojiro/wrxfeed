import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ResetPwdForm, { ResetPwdFormProps } from '.';

export default {
  title: 'Organisms/ResetPwdForm',
  component: ResetPwdForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ResetPwdFormProps> = (args) => {
  const { onSubmit } = args;
  return <ResetPwdForm onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
