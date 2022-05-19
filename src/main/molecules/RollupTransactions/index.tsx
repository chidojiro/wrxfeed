import React, { useState } from 'react';
import { Transaction } from '@main/entity';
import { classNames } from '@common/utils';
import RollupTranRow from '../RollupTranRow';

interface RollupTransactionsProps {
  className?: string;
  trans: Transaction[];
  autoShowTrans?: boolean;
  showTopDivider?: boolean;
  feedId: number;
}

const RollupTransactions: React.VFC<RollupTransactionsProps> = ({
  trans,
  autoShowTrans = false,
  showTopDivider = false,
  feedId,
}) => {
  const [position, setPosition] = useState(autoShowTrans ? 10 : 0);
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
      <div className="flex w-full h-5 flex-row items-center mt-1">
        <div className="bg-Gray-11 h-px w-auto flex-1" />
        <button
          onClick={onClickLoadMore}
          type="button"
          className="flex px-2 justify-center items-center"
        >
          <p className="text-Gray-1 text-xs font-normal">
            {position === 0 && trans.length > 0 ? 'View Transactions' : 'Load more'}
          </p>
        </button>
        <div className="bg-Gray-11 h-px w-auto flex-1" />
      </div>
    );
  };
  if (trans.length === 0) {
    if (showTopDivider) {
      return <div className={classNames('bg-Gray-11 h-px w-full', showTopDivider ? 'mt-3' : '')} />;
    }
    return null;
  }
  return (
    <div className={classNames('flex flex-col', showTopDivider ? 'mt-3' : '')}>
      {transactions.length > 0 && showTopDivider && <div className="bg-Gray-11 h-px w-full" />}
      <ul className={classNames('flex flex-col', transactions.length > 0 ? 'py-2' : '')}>
        {transactions.map((item: Transaction) => {
          return (
            <li key={`RollupTransactions-item-${item?.id}`}>
              <RollupTranRow feedId={feedId} tran={item} />
            </li>
          );
        })}
      </ul>
      {renderLoadMore()}
    </div>
  );
};

export default RollupTransactions;
