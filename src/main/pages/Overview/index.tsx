/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import {
  FeedChannelEvents,
  FeedEventData,
  FilterKeys,
  useFeedChannel,
  useTransaction,
} from '@main/hooks';
import { TransactionFilter } from '@api/types';
import TargetPanel from '@main/organisms/TargetPanel';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import { useQuery } from '@common/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { Department, Vendor, Category } from '@main/entity';
import NewFeedIndicator from '@main/atoms/NewFeedIndicator';
import { useApi } from '@api';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const OverviewPage: React.VFC = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const { readAllTransactions } = useApi();
  // Local states
  const [filter, setFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const [filterTitle, setFilterTitle] = useState('');
  const {
    transactions,
    hasMore,
    newFeedCount,
    isLoading,
    updateCategory,
    upsertNewFeedCount,
    setNewFeedCount,
  } = useTransaction(filter);
  const filterKey = FilterKeys.find((key) => query.get(key));
  const newFeedNumber = newFeedCount ? newFeedCount[location.pathname] : 0;

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

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      pagination: {
        limit: prevFilter?.pagination?.limit ?? 0,
        offset: (prevFilter?.pagination?.offset ?? 0) + (prevFilter?.pagination?.limit ?? 0),
      },
    }));
  }, [hasMore, isLoading]);

  useEffect(() => {
    // Mark all transactions as read
    if (newFeedNumber > 0)
      readAllTransactions().then(() => {
        upsertNewFeedCount(location.pathname, 0);
      });
  }, []);

  useEffect(() => {
    if (filterKey) {
      setFilter({
        pagination: INIT_PAGINATION,
        [filterKey]: query.get(filterKey),
      });
    } else {
      setFilter({
        pagination: INIT_PAGINATION,
      });
    }
  }, [setFilter, filterKey]);

  const handleFilter = (
    key: keyof TransactionFilter,
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
    setFilter({ ...filter, pagination: INIT_PAGINATION });
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

  return (
    <MainLayout>
      <h1 className="sr-only">Transaction list</h1>
      {!!filterKey && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon className="cursor-pointer" onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      )}
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
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

export default OverviewPage;
