import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Transaction } from '@main/types';
import { STATUS } from '@common/atoms/StatusTag';
import TransactionContent, { TransactionContentProps } from '.';

export default {
  title: 'Atoms/TransactionContent',
  component: TransactionContent,
} as Meta;

const Template: Story<TransactionContentProps> = (args) => {
  const { transaction } = args;
  return <TransactionContent transaction={transaction} />;
};

export const Default = Template.bind({});
const transaction: Transaction = {
  id: '1',
  owner: {
    name: 'Professional Services',
  },
  date: Date.now(),
  amount: 17000,
  description: 'Google Analytics-Adservices',
  status: STATUS.NEW,
};
Default.args = { transaction };
