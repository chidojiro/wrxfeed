import React, { useCallback, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { TransactionFilter } from '@api/types';
import TargetPanel from '@main/organisms/TargetPanel';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import { Transaction } from '@main/entity';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const FilterKeys: string[] = ['department', 'category', 'vendor'];
const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

const OverviewPage: React.VFC = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const { transactions, hasMore, isLoading, updateCategory } = useTransaction(filter);
  const filterKey = Object.keys(filter).find((key) => FilterKeys.includes(key));
  const filterTitle =
    filterKey && !!transactions.length
      ? getKeyValue(
          transactions[0],
          filterKey as keyof Pick<Transaction, 'department' | 'vendor' | 'category'>,
        )?.name
      : '';

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

  const handleFilter = (key: keyof TransactionFilter, value?: number): void => {
    setFilter({
      pagination: INIT_PAGINATION,
      [key]: value,
    });
  };

  const clearFilter = (): void => {
    setFilter({ pagination: INIT_PAGINATION });
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Transaction list</h1>
      {!!filterKey && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon onClick={clearFilter} />
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

export default OverviewPage;
