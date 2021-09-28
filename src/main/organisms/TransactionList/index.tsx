import React from 'react';

import Divider from '@mui/material/Divider';
import TransactionItem from '@main/molecules/TransactionItem';
import { useTransaction } from '@main/hooks';
// import { dummyTransactions } from './dummy';

const TransactionList: React.VFC = () => {
  const { transactions = [] } = useTransaction();
  // const transactions = dummyTransactions;
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
