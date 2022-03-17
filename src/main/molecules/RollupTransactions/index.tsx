import React, { useState } from 'react';
import { Transaction } from '@main/entity';
import RollupTranRow from '../RollupTranRow';

interface RollupTransactionsProps {
  className?: string;
  trans: Transaction[];
}

const RollupTransactions: React.VFC<RollupTransactionsProps> = ({ trans }) => {
  const [position, setPosition] = useState(10);
  const [transactions, setTransactions] = useState(trans.slice(0, position));
  const [hasMore, setHasMore] = useState(trans?.length > 10);

  const onClickLoadMore = () => {
    if (!hasMore) {
      return;
    }
    const newPos = position + 10;
    if (newPos > trans.length) {
      setHasMore(false);
      setTransactions(trans);
    } else {
      setTransactions(trans.slice(0, newPos));
      setPosition(newPos);
    }
  };

  const renderLoadMore = () => {
    if (!hasMore) {
      return (
        <div className="flex h-px w-full items-center">
          <div className="bg-Gray-11 h-px w-auto flex-1" />
        </div>
      );
    }
    return (
      <div className="flex w-full h-5 flex-row items-center mt-4">
        <div className="bg-Gray-11 h-px w-auto flex-1" />
        <button
          onClick={onClickLoadMore}
          type="button"
          className="flex px-2 justify-center items-center"
        >
          <p className="text-Gray-1 text-xs font-normal">Load more</p>
        </button>
        <div className="bg-Gray-11 h-px w-auto flex-1" />
      </div>
    );
  };
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col py-4">
        {transactions.map((item: Transaction) => {
          return (
            <li key={`RollupTransactions-item-${item?.id}`}>
              <RollupTranRow tran={item} />
            </li>
          );
        })}
      </ul>
      {renderLoadMore()}
    </div>
  );
};

export default RollupTransactions;
