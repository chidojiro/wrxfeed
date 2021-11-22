import React, { CSSProperties } from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category, Rollup } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';
import RollupCard from '@main/molecules/RollupCard';

interface FeedListProps {
  style?: CSSProperties;
  rollups: Rollup[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  updateCategory?: (category: Partial<Category>) => Promise<void>;
}

const FeedList: React.VFC<FeedListProps> = ({
  style,
  rollups,
  isLoading,
  hasMore,
  onLoadMore,
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
        {rollups.map((rollup) => (
          <li key={rollup.id}>
            <RollupCard key={rollup.id} rollup={rollup} updateCategory={updateCategory} />
          </li>
        ))}
      </ul>
      {!isLoading && !rollups.length && renderEmptyList()}
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default FeedList;
