/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useFeed } from '@main/hooks/feed.hook';
import { GetFeedsFilters } from '@api/types';
import { FeedChannelEvents, FeedEventData, FilterKeys, useFeedChannel } from '@main/hooks';
import { useQuery } from '@common/hooks';
import { useApi } from '@api';

import { Category, Department, Vendor } from '@main/entity';

import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import FeedList from '@main/organisms/FeedList';
import NewFeedIndicator from '@main/atoms/NewFeedIndicator';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';

const LIMIT = 10;
const INIT_PAGINATION = {
  offset: 0,
  limit: LIMIT,
};
const INIT_FEED_FILTER = Object.freeze({
  page: INIT_PAGINATION,
  forYou: 0,
});

const CompanyPage: React.VFC = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const { readAllTransactions } = useApi();
  const [feedFilters, setFeedFilters] = React.useState<GetFeedsFilters>(INIT_FEED_FILTER);
  const [filterTitle, setFilterTitle] = React.useState('');
  const filterKey = FilterKeys.find((key) => query.get(key));

  const {
    feeds,
    hasMore,
    isLoading,
    updateCategory,
    newFeedCount,
    upsertNewFeedCount,
    setNewFeedCount,
  } = useFeed(feedFilters);
  const newFeedNumber = newFeedCount ? newFeedCount[location.pathname] : 0;
  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFeedFilters((prevFilters) => ({
      page: {
        limit: prevFilters?.page?.limit ?? 0,
        offset: (prevFilters?.page?.offset ?? 0) + (prevFilters?.page?.limit ?? 0),
      },
      forYou: 0,
    }));
  }, [hasMore, isLoading]);

  React.useEffect(() => {
    if (filterKey) {
      setFeedFilters({
        page: INIT_PAGINATION,
        [filterKey]: query.get(filterKey),
        forYou: 0,
      });
    } else {
      setFeedFilters(INIT_FEED_FILTER);
    }
  }, [setFeedFilters, filterKey]);

  const handleFilter = (
    key: keyof GetFeedsFilters,
    value?: Department | Category | Vendor,
  ): void => {
    const queryString = `?${key}=${value?.id}`;
    history.push({
      pathname: history.location.pathname,
      search: queryString,
    });
    setFilterTitle(value?.name ?? '');
  };

  const clearFilter = (): void => {
    history.goBack();
  };

  const refetchNewItems = () => {
    setFeedFilters({ ...feedFilters, page: INIT_PAGINATION });
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    // Clear counter
    upsertNewFeedCount(location.pathname, 0);
    readAllTransactions();
  };

  // Subscribe feed event
  useFeedChannel(FeedChannelEvents.NEW_ITEM, (data: FeedEventData) => {
    if (data.id) {
      // Increase counter
      setNewFeedCount((prevCount) => ({
        ...prevCount,
        [location.pathname]: prevCount[location.pathname] + 1,
      }));
    }
  });

  return (
    <MainLayout>
      <h1 className="sr-only">Feed list</h1>
      {!!filterKey && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon className="cursor-pointer" onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      )}
      <FeedList
        feeds={feeds}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasMore={hasMore}
        onFilter={handleFilter}
        updateCategory={updateCategory}
      />
      <NewFeedIndicator
        isVisible={newFeedNumber > 0}
        counter={newFeedNumber}
        onClick={refetchNewItems}
      />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default CompanyPage;
