import React from 'react';
import TransactionCard from '@main/molecules/TransactionCard';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Transaction } from '@main/entity';
import { TransactionFilter } from '@api/types';
import TransactionLoading from '@main/atoms/TransactionLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onLoadMore: () => void;
  onFilter?: (key: keyof TransactionFilter, value?: string) => void;
  hasMore: boolean;
}

const TransactionList: React.VFC<TransactionListProps> = ({
  transactions,
  isLoading,
  onLoadMore,
  onFilter,
  hasMore,
}) => {
  return (
    <InfiniteScroller
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'scroll',
        mr: 2,
      }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<TransactionLoading />}
    >
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onClickVendor={(value) => onFilter && onFilter('vendor', value)}
            onClickDepartment={(value) => onFilter && onFilter('department', value)}
            onClickCategory={(value) => onFilter && onFilter('category', value)}
          />
        ))}
      </ul>
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default TransactionList;
