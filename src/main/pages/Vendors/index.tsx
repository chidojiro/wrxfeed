import React, { useCallback, useState } from 'react';
import MainLayout from '@common/templates/MainLayout';
import VendorList from '@main/organisms/VendorList';
import { Pagination, TransactionFilter } from '@api/types';
import { useVendor } from '@main/hooks/vendor.hook';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CategoriesPage: React.VFC = () => {
  const companyName = 'Bird';
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { vendors, hasMore, isLoading } = useVendor(filter);
  // Transaction states
  const [transFilter, setTransFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const {
    transactions,
    hasMore: hasMoreTrans,
    isLoading: transLoading,
  } = useTransaction(transFilter);
  // Variables
  const isFiltering = !!transFilter.vendor;
  const filterTitle = vendors.find((vendor) => vendor.id === transFilter.vendor)?.name;

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
    <MainLayout companyName={companyName}>
      <h1 className="sr-only">Department list</h1>
      {isFiltering && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon onClick={clearFilter} />
          <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
        </div>
      )}
      {!isFiltering ? (
        <VendorList
          vendors={vendors}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={({ id }) => handleTransFilter('vendor', id)}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          isLoading={transLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          // onFilter={handleTransFilter}
        />
      )}
    </MainLayout>
  );
};

export default CategoriesPage;
