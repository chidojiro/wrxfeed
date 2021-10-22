import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Transaction, Visibility } from '@main/entity';
import TransactionCard, { TransactionCardProps } from '.';

export default {
  title: 'Molecules/TransactionCard',
  component: TransactionCard,
} as Meta;

const Template: Story<TransactionCardProps> = (args) => {
  const { transaction } = args;
  return <TransactionCard transaction={transaction} />;
};

export const Default = Template.bind({});
const transaction: Transaction = {
  id: 1,
  category: { id: 1, name: 'Professional Services', visibility: Visibility.VISIBLE },
  department: { id: 1, name: 'Department', parent: { id: 2, name: 'Parent Department' } },
  vendor: { id: 1, name: 'Vendor' },
  transDate: new Date().toISOString(),
  amount: 17000,
  currency: '$',
  commentCount: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
Default.args = { transaction };
