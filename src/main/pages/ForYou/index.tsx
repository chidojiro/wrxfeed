/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import * as Sentry from '@sentry/react';
import { useHistory, useLocation } from 'react-router-dom';

import { FeedFilters } from '@/api/types';
import { Category, Department, Vendor } from '@/main/entity';

import { FeedChannelEvents, FeedEventData, useFeedChannel } from '@/main/hooks';
import { useQuery } from '@/common/hooks';
import { useApi } from '@/api';

import MainLayout from '@/common/templates/MainLayout';
import FeedList, { FeedListHandler } from '@/main/organisms/FeedList';
import NewFeedIndicator from '@/main/atoms/NewFeedIndicator';
import { ReactComponent as ChevronLeftIcon } from '@/assets/icons/outline/chevron-left.svg';
import { MainGroups } from '@/common/constants';

import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@/identity/hooks';
import { useNewFeedCount } from '@/main/hooks/newFeedCount.hook';
import { scrollToTop } from '@/main/utils';

const FilterKeys: string[] = ['department', 'category', 'vendor', 'rootDepartment'];

const ForYouPage: React.VFC = () => {
  const history = useHistory();
  const query = useQuery();
  const location = useLocation();
  const { readAllTransactions } = useApi();
  const identity = useIdentity();
  const filterKey = FilterKeys.find((key) => query.get(key));
  const [filterTitle, setFilterTitle] = React.useState('');
  const { newFeedCount, setNewFeedCount, upsertNewFeedCount } = useNewFeedCount();
  const newFeedNumber = newFeedCount ? newFeedCount[location.pathname] : 0;
  const feedListRef = useRef<FeedListHandler>(null);

  useFeedChannel(FeedChannelEvents.NEW_ITEM, (data: FeedEventData) => {
    if (data.id) {
      setNewFeedCount((prevCount) => ({
        ...prevCount,
        [location.pathname]: prevCount[location.pathname] + 1,
      }));
    }
  });

  useEffect(() => {
    if (newFeedNumber > 0)
      readAllTransactions().then(() => {
        upsertNewFeedCount(location.pathname, 0);
      });

    // First time load
    mixpanel.track('For You Feed View', {
      user_id: identity?.id,
      email: identity?.email,
      company: identity?.company?.id,
    });
  }, []);

  const refetchNewItems = () => {
    feedListRef.current?.resetFeedFilters();
    scrollToTop();
    upsertNewFeedCount(location.pathname, 0);
    readAllTransactions();
  };

  const handleFilter = (key: keyof FeedFilters, value?: Department | Category | Vendor): void => {
    // Update according to AP-889 https://heyarrow.atlassian.net/browse/AP-889
    if (key === 'department') {
      history.push({
        pathname: `/departments/${value?.id}`,
        search: `?route=${MainGroups.Following}`,
      });
      return;
    }

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

  return (
    <MainLayout className="flex flex-col" rightSide={false}>
      <NewFeedIndicator
        isVisible={!!newFeedNumber}
        counter={newFeedNumber}
        onClick={refetchNewItems}
      />
      <h1 className="sr-only">For you feed</h1>
      {filterKey && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon className="cursor-pointer" onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      )}
      <FeedList ref={feedListRef} onFilter={handleFilter} hasEmptyStateComponent hasEndComponent />
    </MainLayout>
  );
};

export default Sentry.withProfiler(ForYouPage, { name: 'ForYouPage' });
