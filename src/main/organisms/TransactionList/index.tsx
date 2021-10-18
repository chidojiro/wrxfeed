import React, { CSSProperties } from 'react';
import TransactionCard from '@main/molecules/TransactionCard';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Transaction } from '@main/entity';
import { TransactionFilter } from '@api/types';
import TransactionLoading from '@main/atoms/TransactionLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';

interface TransactionListProps {
  style?: CSSProperties;
  transactions: Transaction[];
  isLoading: boolean;
  onLoadMore?: () => void;
  onFilter?: (key: keyof TransactionFilter, value?: number) => void;
  hasMore: boolean;
}

const TransactionList: React.VFC<TransactionListProps> = ({
  style,
  transactions,
  isLoading,
  onLoadMore,
  onFilter,
  hasMore,
}) => {
  return (
    <InfiniteScroller
      style={{
        paddingBottom: 52,
        marginRight: 2,
        ...style,
        // position: 'absolute',
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
      {!isLoading && !transactions.length && (
        <div className="text-lg text-center text-Gray-6 mb-24">No Results</div>
      )}
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default TransactionList;
