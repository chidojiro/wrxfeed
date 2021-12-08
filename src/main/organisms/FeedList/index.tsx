import React, { CSSProperties } from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category, FeedItem } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import ListEndComponent from '@main/atoms/ListEndComponent';
import RollupCard from '@main/molecules/RollupCard';

interface FeedListProps {
  style?: CSSProperties;
  feeds: FeedItem[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  updateCategory?: (category: Partial<Category>) => Promise<void>;
}

const FeedList: React.VFC<FeedListProps> = ({
  style,
  feeds,
  isLoading,
  hasMore,
  onLoadMore,
  updateCategory,
}) => {
  const renderEmptyList = () => (
    <div className="pb-2 sm:pb-5 text-center">
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
      <h3 className="mt-2 text-sm text-Gray-3">No rollups now!</h3>
    </div>
  );

  return (
    <InfiniteScroller
      className="pb-4 sm:pb-12 mr-0.5"
      style={style}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="pb-2 sm:pb-5 space-y-4">
        {feeds.map((feed) => (
          <li key={feed.id}>
            <RollupCard key={feed.id} feedItem={feed} updateCategory={updateCategory} />
          </li>
        ))}
      </ul>
      {!isLoading && !feeds.length && renderEmptyList()}
      {!isLoading && feeds.length > 0 && !hasMore && <ListEndComponent />}
    </InfiniteScroller>
  );
};

export default FeedList;
