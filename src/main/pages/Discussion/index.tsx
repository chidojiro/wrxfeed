/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { TransactionFilter } from '@api/types';
import TargetPanel from '@main/organisms/TargetPanel';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import { useQuery } from '@common/hooks';
import { useHistory } from 'react-router-dom';
import { Department, Vendor, Category } from '@main/entity';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const FilterKeys: string[] = ['department', 'category', 'vendor', 'rootDepartment'];

const DiscussionPage: React.VFC = () => {
  const query = useQuery();
  const history = useHistory();
  const [filter, setFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const [filterTitle, setFilterTitle] = useState('For you');
  const { transactions, hasMore, isLoading, updateCategory } = useTransaction(filter);
  const filterKey = FilterKeys.find((key) => query.get(key));

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
  return (
    <MainLayout>
      <h1 className="sr-only">For you feed</h1>
      {/* {!!filterKey && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon className="cursor-pointer" onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      )} */}
      <div className="flex items-center space-x-4 pb-8">
        <h1 className="text-Gray-3 text-xl font-semibold">For you</h1>
      </div>
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

export default DiscussionPage;
