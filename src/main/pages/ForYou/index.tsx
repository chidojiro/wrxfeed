/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { useHistory, useLocation } from 'react-router-dom';

import { FeedFilters } from '@api/types';
import { Category, Department, Vendor } from '@main/entity';

import { FeedChannelEvents, FeedEventData, useFeedChannel } from '@main/hooks';
import { useFeed } from '@main/hooks/feed.hook';
import { useQuery } from '@common/hooks';
import { useApi } from '@api';

import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import FeedList from '@main/organisms/FeedList';
import TargetPanel from '@main/organisms/TargetPanel';
import NewFeedIndicator from '@main/atoms/NewFeedIndicator';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});
const INIT_FOR_YOU_FILTER = Object.freeze({
  page: INIT_PAGINATION,
  forYou: 1,
});

const FilterKeys: string[] = ['department', 'category', 'vendor', 'rootDepartment'];

const ForYouPage: React.VFC = () => {
  const history = useHistory();
  const query = useQuery();
  const location = useLocation();
  const { readAllTransactions } = useApi();

  const [feedFilters, setFeedFilters] = React.useState<FeedFilters>(INIT_FOR_YOU_FILTER);
  const { feeds, hasMore, isLoading, setNewFeedCount, upsertNewFeedCount, newFeedCount } =
    useFeed(feedFilters);

  const filterKey = FilterKeys.find((key) => query.get(key));
  const [filterTitle, setFilterTitle] = React.useState('');
  const newFeedNumber = newFeedCount ? newFeedCount[location.pathname] : 0;

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFeedFilters((prevFilter) => ({
      ...prevFilter,
      page: {
        limit: prevFilter?.page?.limit ?? LIMIT,
        offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? LIMIT),
      },
    }));
  }, [hasMore, isLoading]);

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

  useEffect(() => {
    // Mark all transactions as read
    if (newFeedNumber > 0)
      readAllTransactions().then(() => {
        upsertNewFeedCount(location.pathname, 0);
      });
  }, []);

  useEffect(() => {
    if (filterKey) {
      setFeedFilters({
        ...INIT_FOR_YOU_FILTER,
        [filterKey]: query.get(filterKey),
      });
    } else {
      setFeedFilters(INIT_FOR_YOU_FILTER);
    }
  }, [setFeedFilters, filterKey]);

  const refetchNewItems = () => {
    setFeedFilters({ ...feedFilters, page: INIT_PAGINATION });
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
    // Clear counter
    upsertNewFeedCount(location.pathname, 0);
    readAllTransactions();
  };

  const handleFilter = (key: keyof FeedFilters, value?: Department | Category | Vendor): void => {
    const queryString = `?${key}=${value?.id}`;
    history.push({
      pathname: history.location.pathname,
      search: queryString,
    });
    // cleanData();
    setFilterTitle(value?.name ?? '');
  };

  const clearFilter = (): void => {
    history.goBack();
  };

  return (
    <MainLayout className="flex flex-col">
      <NewFeedIndicator
        isVisible={!!newFeedNumber}
        counter={newFeedNumber}
        onClick={refetchNewItems}
      />
      <h1 className="sr-only">For you feed</h1>

      {filterKey ? (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon className="cursor-pointer" onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      ) : (
        <div className="flex items-center space-x-4 pb-8">
          <h1 className="text-Gray-3 text-xl font-semibold ml-4 sm:ml-0">For you</h1>
        </div>
      )}
      <FeedList
        feeds={feeds}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasMore={hasMore}
        onFilter={handleFilter}
      />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default Sentry.withProfiler(ForYouPage, { name: 'ForYouPage' });
