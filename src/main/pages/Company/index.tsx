/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { useFeed } from '@main/hooks/feed.hook';
import { FeedFilters } from '@api/types';
import { FeedChannelEvents, FeedEventData, FilterKeys, useFeedChannel } from '@main/hooks';
import { useQuery } from '@common/hooks';
import { useApi } from '@api';

import { scrollToTop } from '@main/utils';
import { Category, Department, Vendor } from '@main/entity';

import MainLayout from '@common/templates/MainLayout';
import FeedList from '@main/organisms/FeedList';
import NewFeedIndicator from '@main/atoms/NewFeedIndicator';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import { MainGroups } from '@common/constants';

const LIMIT = 20;
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
  const { readAllTransactions, getVendorById, getCategoryById, getDepartmentById } = useApi();
  const [feedFilters, setFeedFilters] = useState<FeedFilters>(INIT_FEED_FILTER);
  const [filterTitle, setFilterTitle] = useState('');
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
  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFeedFilters((prevFilters) => ({
      page: {
        limit: prevFilters?.page?.limit ?? LIMIT,
        offset: (prevFilters?.page?.offset ?? 0) + (prevFilters?.page?.limit ?? LIMIT),
      },
      forYou: 0,
      ...(filterKey ? { [filterKey]: query.get(filterKey) } : {}),
    }));
  }, [hasMore, isLoading]);

  const getFilterVendorById = async (key: string) => {
    if (key === FilterKeys[2] && filterKey && query.get(filterKey)) {
      const venId = query.get(filterKey);
      if (!venId) return;
      const vendor = await getVendorById(parseInt(venId, 10));
      setFilterTitle(vendor?.name);
    }
  };

  const getFilterCategoryById = async (key: string) => {
    if (key === FilterKeys[1] && filterKey && query.get(filterKey)) {
      const catId = query.get(filterKey);
      if (!catId) return;
      const category = await getCategoryById(parseInt(catId, 10));
      setFilterTitle(category?.name);
    }
  };

  const getFilterDepById = async (key: string) => {
    if (key === FilterKeys[0] && filterKey && query.get(filterKey)) {
      const depId = query.get(filterKey);
      if (!depId) return;
      const department = await getDepartmentById(parseInt(depId, 10));
      setFilterTitle(department?.name);
    }
  };

  useEffect(() => {
    if (filterKey && feeds.length > 0) {
      const firstFeed = feeds[0];
      switch (filterKey) {
        case FilterKeys[2]:
          getFilterVendorById(filterKey);
          break;
        case FilterKeys[3]:
          if (firstFeed?.department?.parent) {
            setFilterTitle(firstFeed?.department?.parent?.name);
          }
          break;
        default:
          break;
      }
    }
  }, [feeds]);

  useEffect(() => {
    if (filterKey) {
      setFeedFilters({
        page: INIT_PAGINATION,
        [filterKey]: query.get(filterKey),
        forYou: 0,
      });
      getFilterDepById(filterKey);
      getFilterCategoryById(filterKey);
      getFilterVendorById(filterKey);
    } else {
      setFeedFilters(INIT_FEED_FILTER);
    }
  }, [setFeedFilters, filterKey]);

  const handleFilter = (key: keyof FeedFilters, value?: Department | Category | Vendor): void => {
    // Update according to AP-889 https://heyarrow.atlassian.net/browse/AP-889
    if (key === 'department') {
      history.push({
        pathname: `/departments/${value?.id}`,
        search: `?route=${MainGroups.Directories}`,
      });
      return;
    }

    const queryString = `?${key}=${value?.id}`;
    history.push({
      pathname: history.location.pathname,
      search: queryString,
    });
    setFilterTitle(value?.name ?? '');
    scrollToTop();
  };

  const clearFilter = (): void => {
    history.goBack();
  };

  const refetchNewItems = () => {
    setFeedFilters({ ...feedFilters, page: INIT_PAGINATION });
    scrollToTop();
    // Clear counter
    upsertNewFeedCount(location.pathname, 0);
    readAllTransactions();
  };

  useFeedChannel(FeedChannelEvents.NEW_ITEM, (data: FeedEventData) => {
    if (data.id) {
      setNewFeedCount((prevCount) => ({
        ...prevCount,
        [location.pathname]: prevCount[location.pathname] + 1,
      }));
    }
  });

  return (
    <MainLayout rightSide={false}>
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
    </MainLayout>
  );
};

export default Sentry.withProfiler(CompanyPage, { name: 'CompanyPage' });
