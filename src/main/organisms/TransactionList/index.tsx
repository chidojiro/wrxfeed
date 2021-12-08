import React, { CSSProperties } from 'react';
import TransactionCard from '@main/molecules/TransactionCard';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category, Department, Transaction, Vendor } from '@main/entity';
import { TransactionFilter } from '@api/types';
import ListLoading from '@main/atoms/ListLoading';
import ListEndComponent from '@main/atoms/ListEndComponent';

interface TransactionListProps {
  style?: CSSProperties;
  transactions: Transaction[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore?: () => void;
  onFilter?: (key: keyof TransactionFilter, value?: Department | Category | Vendor) => void;
  updateCategory?: (category: Partial<Category>) => Promise<void>;
}

const TransactionList: React.VFC<TransactionListProps> = ({
  style,
  transactions,
  isLoading,
  hasMore,
  onLoadMore,
  onFilter,
  updateCategory,
}) => {
  const renderEmptyList = () => (
    <div className="pb-5 text-center">
      <svg
        className="mx-auto h-8 w-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <h3 className="mt-2 text-sm text-Gray-3">No transactions</h3>
    </div>
  );

  return (
    <InfiniteScroller
      style={{
        paddingBottom: 52,
        marginRight: 2,
        ...style,
      }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="pb-5 space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onClickVendor={(value) => onFilter && onFilter('vendor', value)}
            onClickDepartment={(value) => onFilter && onFilter('department', value)}
            onClickCategory={(value) => onFilter && onFilter('category', value)}
            onClickRootDept={(value) => onFilter && onFilter('rootDepartment', value)}
            updateCategory={updateCategory}
          />
        ))}
      </ul>
      {!isLoading && !transactions.length && renderEmptyList()}
      {!isLoading && !hasMore && <ListEndComponent />}
    </InfiniteScroller>
  );
};

export default TransactionList;
