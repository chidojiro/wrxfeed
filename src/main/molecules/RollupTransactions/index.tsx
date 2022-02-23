import React from 'react';
import RollupTranRow from '../RollupTranRow';

interface RollupTransactionsProps {
  className?: string;
  trans: number[];
  onLoadMore: () => void;
}

const RollupTransactions: React.VFC<RollupTransactionsProps> = ({ trans }) => {
  return (
    <ul className="mt-4">
      {trans.map((item: number) => {
        return (
          <li key={`RollupTransactions-item-${item}`}>
            <RollupTranRow tran={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default RollupTransactions;
