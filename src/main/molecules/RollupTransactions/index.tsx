import { Transaction } from '@main/entity';
import React from 'react';
import RollupTranRow from '../RollupTranRow';

interface RollupTransactionsProps {
  className?: string;
  trans: Transaction[];
  onLoadMore?: () => void;
}

const RollupTransactions: React.VFC<RollupTransactionsProps> = ({ trans }) => {
  return (
    <ul className="mt-4">
      {trans.map((item: Transaction) => {
        return (
          <li key={`RollupTransactions-item-${item?.id}`}>
            <RollupTranRow tran={item} />
          </li>
        );
      })}
      <div className="flex h-px bg-Gray-11 mt-4" />
    </ul>
  );
};

export default RollupTransactions;
