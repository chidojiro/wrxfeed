/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import VendorList from '@main/organisms/VendorList';
import { Pagination, TransactionFilter } from '@api/types';
import { useVendor } from '@main/hooks/vendor.hook';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CategoriesPage: React.VFC = () => {
  const history = useHistory();
  const { id: vendorId } = useParams<{ id?: string }>();
  // Vendor state
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { vendors, hasMore, isLoading } = useVendor(filter);
  // Transaction states
  const [transFilter, setTransFilter] = useState<TransactionFilter>(
    vendorId
      ? {
          pagination: INIT_PAGINATION,
          category: parseInt(vendorId, 10),
        }
      : {
          pagination: { offset: 0, limit: 0 }, // Don't load transaction at the first launch
        },
  );
  const {
    transactions,
    hasMore: hasMoreTrans,
    isLoading: transLoading,
    updateCategory,
  } = useTransaction(transFilter);
  // Variables
  const isFiltering = !!transFilter.vendor;
  const vendor = useMemo(() => {
    if (!isFiltering || !transactions.length) return null;
    if (transactions[0].vendor.id === transFilter.vendor) {
      return transactions[0].vendor;
    }
    return null;
  }, [isFiltering, transactions]);

  const filterByRoute = useCallback(() => {
    if (vendorId) {
      const idNum = parseInt(vendorId, 10);
      if (idNum !== transFilter.vendor) {
        setTransFilter({
          pagination: INIT_PAGINATION,
          vendor: idNum,
        });
      }
    } else {
      setTransFilter({ pagination: { offset: 0, limit: 0 } }); // Clean up transaction
    }
  }, [vendorId, transFilter.vendor]);

  useEffect(() => {
    filterByRoute();
  }, [filterByRoute]);

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
    history.push(`/vendors/${value?.toString()}`);
  };

  const clearFilter = (): void => {
    history.push('/vendors');
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      {isFiltering && (
        <div className="flex items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center space-x-4">
            <ChevronLeftIcon onClick={clearFilter} />
            <h1 className="text-Gray-1 text-xl font-bold">{vendor?.name}</h1>
          </div>
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
          isLoading={transLoading || isLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          updateCategory={updateCategory}
        />
      )}
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default CategoriesPage;
