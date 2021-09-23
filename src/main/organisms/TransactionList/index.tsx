import React from 'react';

import Divider from '@mui/material/Divider';
import { Transaction } from '@main/types';
import TransactionItem from '@main/molecules/TransactionItem';

export interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.VFC<TransactionListProps> = ({ transactions }) => {
  return (
    <>
      {transactions.map((transaction) => (
        <React.Fragment key={transaction.id}>
          <Divider />
          <TransactionItem transaction={transaction} />
        </React.Fragment>
      ))}
    </>
  );
};

export default TransactionList;
