import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ChangePwdForm, { ChangePwdFormProps } from '.';

export default {
  title: 'Organisms/ChangePwdForm',
  component: ChangePwdForm,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta;

const Template: Story<ChangePwdFormProps> = (args) => {
  const { onSubmit } = args;
  return <ChangePwdForm onSubmit={onSubmit} />;
};

export const Default = Template.bind({});
