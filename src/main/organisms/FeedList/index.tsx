/* eslint-disable react-hooks/exhaustive-deps */
import { FeedFilters } from '@/api/types';
import InfiniteScroller from '@/common/atoms/InfiniteScroller';
import { useLegacyQuery } from '@/common/hooks';
import { LineItemDrawer } from '@/feed/LineItemDrawer';
import { TargetFeedCard } from '@/feed/TargetFeedCard';
import { useLineItemDrawer } from '@/feed/useLineItemDrawer';
import ListEndComponent from '@/main/atoms/ListEndComponent';
import ListLoading from '@/main/atoms/ListLoading';
import { Category, Department } from '@/main/entity';
import { FilterKeys } from '@/main/hooks';
import { useFeed } from '@/main/hooks/feed.hook';
import RollupCard from '@/main/molecules/RollupCard';
import { Vendor } from '@/vendor/types';
import clsx from 'clsx';
import React, {
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { useHistory } from 'react-router-dom';

interface FeedListProps {
  style?: CSSProperties;
  hasEmptyStateComponent?: boolean;
  hasEndComponent?: boolean;
  onFilter?: (key: keyof FeedFilters, value?: Department | Category | Vendor) => void;
  depId?: number;
  forYou?: 1 | 0;
  categoryId?: number;
  vendorId?: number;
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
});

const FeedList: ForwardRefRenderFunction<FeedListHandler, FeedListProps> = (
  { style, hasEmptyStateComponent, hasEndComponent, onFilter, depId, forYou, categoryId, vendorId },
  ref,
) => {
  const { isLineItemDrawerOpen, selectedLineItem, closeLineItemDrawer, feedId } =
    useLineItemDrawer();

  const [feedFilters, setFeedFilters] = React.useState<FeedFilters>({
    ...INIT_FEED_FILTER,
    forYou,
    departmentId: depId,
    categoryId,
    vendorId,
  });

  const { feeds, hasMore, isLoading, updateCategory, cleanData } = useFeed(feedFilters);
  const query = useLegacyQuery();
  const history = useHistory();
  const filterKey = FilterKeys.find((key) => query.get(key));

  useImperativeHandle(ref, () => ({
    resetFeedFilters: (): void => {
      setFeedFilters({ ...feedFilters, page: INIT_PAGINATION });
    },
  }));

  useEffect(() => {
    cleanData();
    setFeedFilters({
      ...INIT_FEED_FILTER,
      ...(depId !== undefined ? { departmentId: depId } : {}),
      ...(categoryId !== undefined ? { categoryId } : {}),
      ...(vendorId !== undefined ? { vendorId } : {}),
    });
  }, [depId, categoryId, vendorId]);

  useEffect(() => {
    if (filterKey) {
      setFeedFilters({
        ...INIT_FEED_FILTER,
        forYou,
        [filterKey]: query.get(filterKey),
      });
    }
  }, [filterKey]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFeedFilters((prevFilter) => {
      return {
        ...prevFilter,
        page: {
          limit: prevFilter?.page?.limit ?? LIMIT,
          offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? LIMIT),
        },
        forYou,
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
      <p className={clsx('text-base text-center text-Neutral-4', className)}>
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
      // onLoadMore={handleLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <LineItemDrawer
        open={isLineItemDrawerOpen}
        onClose={closeLineItemDrawer}
        lineItem={selectedLineItem}
        feedId={feedId}
      />
      <ul className="pb-2 sm:pb-5 space-y-4">
        {feeds.map((feed) => {
          if (feed.type === FeedItemType.target) {
            return <TargetFeedCard key={feed.id} feedItem={feed} />;
          }
          if (feed.type === FeedItemType.transaction) {
            return (
              <RollupCard
                key={`RollupCard-${feed.id}`}
                feedItem={feed}
                updateCategory={updateCategory}
                onClickVendor={(value) => onFilter && onFilter('vendorId', value)}
                onClickDepartment={(value) => onFilter && onFilter('departmentId', value)}
                onClickCategory={(value) => onFilter && onFilter('categoryId', value)}
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
