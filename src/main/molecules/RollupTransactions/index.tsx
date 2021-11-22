// import { MessageTextAlt } from '@assets/index';
import { classNames } from '@common/utils';
import React from 'react';
import { Transaction } from '@main/entity';
import RollupTransactionItem from '../RollupTransactionItem';

export interface RollupTransactionsProps {
  className?: string;
  transactions?: Transaction[];
}

const RollupTransactions: React.VFC<RollupTransactionsProps> = ({ className, transactions }) => {
  return transactions?.length ? (
    <ul className={classNames('w-full py-2 sm:py-4 bg-Gray-18 max-h-[435px]', className ?? '')}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <RollupTransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  ) : null;
};

export default RollupTransactions;
