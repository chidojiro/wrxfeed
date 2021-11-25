/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { TransactionFilter } from '@api/types';
import TargetPanel from '@main/organisms/TargetPanel';
import { useQuery } from '@common/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { Department, Vendor, Category } from '@main/entity';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import { profileState } from '@auth/containers/ProfileEditForm/states';
import { useRecoilValue } from 'recoil';
import { useForYouNew } from '@main/hooks/forYouNew.hook';
import { useApi } from '@api';
import NewFeedIndicator from '@main/atoms/NewFeedIndicator';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});
const INIT_FILTERS = Object.freeze({
  forYou: true,
  pagination: INIT_PAGINATION,
});

const FilterKeys: string[] = ['department', 'category', 'vendor', 'rootDepartment'];

const ForYouPage: React.VFC = () => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const { readAllTransactions } = useApi();
  const [filter, setFilter] = useState<TransactionFilter>(INIT_FILTERS);
  const [filterTitle, setFilterTitle] = useState('');
  const { transactions, hasMore, newFeedCount, isLoading, updateCategory, upsertNewFeedCount } =
    useTransaction(filter);
  const filterKey = FilterKeys.find((key) => query.get(key));
  const profile = useRecoilValue(profileState);
  const { counter, readAll } = useForYouNew(`feed-${profile.id}`);

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
    if (newFeedCount && newFeedCount[location.pathname] > 0)
      readAllTransactions().then(() => {
        upsertNewFeedCount(location.pathname, 0);
      });
  }, []);

  useEffect(() => {
    if (filterKey) {
      setFilter({
        ...INIT_FILTERS,
        [filterKey]: query.get(filterKey),
      });
    } else {
      setFilter(INIT_FILTERS);
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

  const onClickNewMessage = () => {
    readAll();
    setFilter(INIT_FILTERS);
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <MainLayout className="flex flex-col">
      <NewFeedIndicator isVisible={counter > 0} counter={counter} onClick={onClickNewMessage} />
      <h1 className="sr-only">For you feed</h1>
      <div className="flex items-center space-x-4 pb-8">
        <h1 className="text-Gray-3 text-xl font-semibold ml-4 sm:ml-0">For you</h1>
      </div>
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
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default ForYouPage;
