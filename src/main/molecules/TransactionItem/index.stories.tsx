import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Transaction } from '@main/entity';
import { STATUS } from '@common/atoms/StatusTag';
import TransactionItem, { TransactionItemProps } from '.';

export default {
  title: 'Molecules/TransactionItem',
  component: TransactionItem,
} as Meta;

const Template: Story<TransactionItemProps> = (args) => {
  const { transaction } = args;
  return <TransactionItem transaction={transaction} />;
};

export const Default = Template.bind({});
const transaction: Transaction = {
  id: 1,
  category: 'Professional Services',
  transDate: new Date().toISOString(),
  amount: 17000,
  description: 'Google Analytics-Adservices',
  status: STATUS.NEW,
};
Default.args = { transaction };
