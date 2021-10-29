import React, { useCallback, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import DepartmentList from '@main/organisms/DepartmentList';
import { Pagination, TransactionFilter } from '@api/types';
import { useDepartment } from '@main/hooks/department.hook';
import { useTransaction } from '@main/hooks';
import TransactionList from '@main/organisms/TransactionList';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const DepartmentsPage: React.VFC = () => {
  // Deparment states
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { departments, hasMore, isLoading } = useDepartment(filter);
  // Transaction states
  const [transFilter, setTransFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const {
    transactions,
    hasMore: hasMoreTrans,
    isLoading: transLoading,
    updateCategory,
  } = useTransaction(transFilter);
  // Variables
  const isFiltering = !!transFilter.department;
  const filterTitle = departments.find((dept) => dept.id === transFilter.department)?.name;

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  const handleTransLoadMore = useCallback(() => {
    if (!hasMoreTrans || transLoading) return;
    setTransFilter((prevFilter) => ({
      ...prevFilter,
      pagination: {
        limit: prevFilter?.pagination?.limit ?? 0,
        offset: (prevFilter?.pagination?.offset ?? 0) + (prevFilter?.pagination?.limit ?? 0),
      },
    }));
  }, [hasMoreTrans, transLoading]);

  const handleTransFilter = (key: keyof TransactionFilter, value?: number): void => {
    setTransFilter({
      pagination: INIT_PAGINATION,
      [key]: value,
    });
  };

  const clearFilter = (): void => {
    setTransFilter({ pagination: INIT_PAGINATION });
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      {isFiltering && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      )}
      {!isFiltering ? (
        <DepartmentList
          departments={departments}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={({ id }) => handleTransFilter('department', id)}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          isLoading={transLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          // onFilter={handleTransFilter}
          updateCategory={updateCategory}
        />
      )}
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default DepartmentsPage;
