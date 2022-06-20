import React, {
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Category, Department, Vendor } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import ListEndComponent from '@main/atoms/ListEndComponent';
import RollupCard from '@main/molecules/RollupCard';
import { FeedFilters } from '@api/types';
import TargetFeedItem from '@main/molecules/TargetFeedItem';
import { useFeed } from '@main/hooks/feed.hook';
import { FilterKeys } from '@main/hooks';
import { useQuery } from '@common/hooks';
import { useHistory } from 'react-router-dom';
import { classNames } from '@common/utils';

interface FeedListProps {
  style?: CSSProperties;
  hasEmptyStateComponent?: boolean;
  hasEndComponent?: boolean;
  onFilter?: (key: keyof FeedFilters, value?: Department | Category | Vendor) => void;
}

export interface FeedListHandler {
  resetFeedFilters: () => void;
}

export enum FeedItemType {
  target = 'target',
  transaction = 'transaction',
}

const LIMIT = 5;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const INIT_FEED_FILTER = Object.freeze({
  page: INIT_PAGINATION,
  forYou: 1,
});

const FeedList: ForwardRefRenderFunction<FeedListHandler, FeedListProps> = (
  { style, hasEmptyStateComponent, hasEndComponent, onFilter },
  ref,
) => {
  const [feedFilters, setFeedFilters] = React.useState<FeedFilters>(INIT_FEED_FILTER);
  const { feeds, hasMore, isLoading, updateCategory } = useFeed(feedFilters);
  const query = useQuery();
  const history = useHistory();
  const filterKey = FilterKeys.find((key) => query.get(key));

  useImperativeHandle(ref, () => ({
    resetFeedFilters: (): void => {
      setFeedFilters({ ...feedFilters, page: INIT_PAGINATION });
    },
  }));

  useEffect(() => {
    if (filterKey) {
      setFeedFilters({
        ...INIT_FEED_FILTER,
        [filterKey]: query.get(filterKey),
      });
    } else {
      setFeedFilters(INIT_FEED_FILTER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFeedFilters, filterKey]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFeedFilters((prevFilter) => {
      return {
        ...prevFilter,
        page: {
          limit: prevFilter?.page?.limit ?? LIMIT,
          offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? LIMIT),
        },
      };
    });
  }, [hasMore, isLoading]);

  const onClickFollowingMoreTeams = () => {
    history.push({
      pathname: '/departments',
    });
  };

  const renderForYouEndList = (className = 'mt-3 sm:mt-8') => {
    return (
      <p className={classNames('text-base text-center text-Neutral-4', className)}>
        Add to your feed by
        <button
          type="button"
          onClick={onClickFollowingMoreTeams}
          className="ml-1 text-Gray-3 underline"
        >
          <u>following more teams</u>
        </button>
        <span role="img" aria-label="rocket">
          {' '}
          🚀
        </span>
      </p>
    );
  };

  const renderEmptyList = hasEmptyStateComponent ? (
    renderForYouEndList()
  ) : (
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

  const renderEndComponent = hasEndComponent ? (
    renderForYouEndList()
  ) : (
    <ListEndComponent message="Add to your feed by following more teams." />
  );

  return (
    <InfiniteScroller
      className="pb-4 sm:pb-12 mr-0.5"
      style={style}
      threshold={500}
      onLoadMore={handleLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="pb-2 sm:pb-5 space-y-4">
        {feeds.map((feed) => {
          if (feed.type === FeedItemType.target) {
            return <TargetFeedItem key={`TargetFeedItem-${feed.id}`} feedItem={feed} />;
          }
          if (feed.type === FeedItemType.transaction) {
            return (
              <RollupCard
                key={`RollupCard-${feed.id}`}
                feedItem={feed}
                updateCategory={updateCategory}
                onClickVendor={(value) => onFilter && onFilter('vendor', value)}
                onClickDepartment={(value) => onFilter && onFilter('department', value)}
                onClickCategory={(value) => onFilter && onFilter('category', value)}
                onClickRootDept={(value) => onFilter && onFilter('rootDepartment', value)}
              />
            );
          }
          return null;
        })}
      </ul>
      {!isLoading && !feeds.length && renderEmptyList}
      {!isLoading && feeds.length > 0 && !hasMore && renderEndComponent}
    </InfiniteScroller>
  );
};

export default forwardRef(FeedList);
