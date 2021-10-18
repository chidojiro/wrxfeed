import React, { useCallback, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { TransactionFilter } from '@api/types';
import TargetPanel from '@main/organisms/TargetPanel';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const OverviewPage: React.VFC = () => {
  const companyName = 'Bird';
  const [filter, setFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const { transactions, hasMore, isLoading } = useTransaction(filter);

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

  return (
    <MainLayout companyName={companyName}>
      <h1 className="sr-only">Transaction list</h1>
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onFilter={handleFilter}
      />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default OverviewPage;
