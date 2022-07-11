import React from 'react';
import { Transaction } from '@/main/entity';
import { classNames, StringUtils } from '@/common/utils';
import RollupTranRow from '../RollupTranRow';
import RestrictedWarning from '@/main/atoms/RestrictedWarning';
import { useLineItemDrawer } from '@/feed/useLineItemDrawer';

export const TRANSACTION_SHOW_NUMBER = 10;

interface RollupTransactionsProps {
  className?: string;
  trans: Transaction[];
  autoShowTrans?: boolean;
  showTopDivider?: boolean;
  feedId: number;
  tranHidden?: boolean;
}

const RollupTransactions: React.VFC<RollupTransactionsProps> = ({
  trans,
  autoShowTrans = false,
  showTopDivider = false,
  feedId,
  tranHidden = false,
}) => {
  const { openLineItemDrawer } = useLineItemDrawer();
  const [position, setPosition] = React.useState(autoShowTrans ? TRANSACTION_SHOW_NUMBER : 0);
  const [transactions, setTransactions] = React.useState(trans?.slice(0, position));
  const [hasMore, setHasMore] = React.useState(
    autoShowTrans ? trans?.length > TRANSACTION_SHOW_NUMBER : trans?.length > 0,
  );

  const onClickLoadMore = () => {
    if (!hasMore) {
      return;
    }
    const newPos = position + TRANSACTION_SHOW_NUMBER;
    if (newPos > trans?.length) {
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
  const showTranClicked = position > TRANSACTION_SHOW_NUMBER;
  return (
    <div className={classNames('flex flex-col', showTopDivider ? 'mt-3' : '')}>
      {transactions.length > 0 && showTopDivider && <div className="bg-Gray-11 h-px w-full" />}
      <ul
        className={classNames(
          StringUtils.withProjectClassNamePrefix('rollup-transactions'),
          'flex flex-col',
          transactions.length > 0 ? 'py-2' : '',
        )}
      >
        {transactions.map((item: Transaction) => {
          return (
            <li key={`RollupTransactions-item-${item?.id}`}>
              <RollupTranRow tran={item} onView={(item) => openLineItemDrawer(item, feedId)} />
            </li>
          );
        })}
      </ul>
      <RestrictedWarning className="mb-1" show={tranHidden && (autoShowTrans || showTranClicked)} />
      {renderLoadMore()}
    </div>
  );
};

export default RollupTransactions;
