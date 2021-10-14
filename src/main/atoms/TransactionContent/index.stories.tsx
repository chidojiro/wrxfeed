import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Transaction } from '@main/entity';
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
  id: 1,
  category: { id: 1, name: 'Professional Services' },
  transDate: new Date().toISOString(),
  amount: 17000,
  vendor: { id: 1, name: 'Vendor name' },
  status: STATUS.NEW,
} as Transaction;
Default.args = { transaction };
