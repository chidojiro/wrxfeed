/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import CategoryList from '@main/organisms/CategoryList';
import { Pagination, TransactionFilter } from '@api/types';
import { useCategory } from '@main/hooks/category.hook';
import TransactionList from '@main/organisms/TransactionList';
import { FilterKeys, useTransaction } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Category, Department, Vendor } from '@main/entity';
import { MainGroups } from '@common/constants';
import { useQuery } from '@common/hooks';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CategoriesPage: React.VFC = () => {
  const history = useHistory();
  const { id: catId } = useParams<{ id?: string }>();
  const query = useQuery();
  const location = useLocation();
  // Category states
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { categories, hasMore, isLoading } = useCategory(filter);
  // Transaction states
  const [transFilter, setTransFilter] = useState<TransactionFilter>(
    catId
      ? {
          pagination: INIT_PAGINATION,
          category: parseInt(catId, 10),
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
  const isFiltering = !!transFilter.category;
  const category = useMemo(() => {
    if (!isFiltering || !transactions.length) return null;
    if (transactions[0].category.id === transFilter.category) {
      return transactions[0].category;
    }
    return null;
  }, [isFiltering, transactions]);

  const filterByRoute = useCallback(() => {
    if (catId) {
      const idNum = parseInt(catId, 10);
      const newFilter: { [key: string]: string | number | Pagination | null } = {
        pagination: INIT_PAGINATION,
        category: idNum,
      };
      FilterKeys.forEach((key) => {
        if (query.get(key)) {
          newFilter[key] = query.get(key);
        }
      });
      setTransFilter(newFilter);
    } else {
      setTransFilter({ pagination: { offset: 0, limit: 0 } }); // Clean up transaction
    }
  }, [catId, query.toString(), transFilter.category]);

  useEffect(() => {
    // Scroll to top
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
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

  const handleCategorySelect = (value?: Category): void => {
    history.push({
      pathname: `/categories/${value?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
  };

  const handleTransFilter = (
    key: keyof TransactionFilter,
    value?: Department | Category | Vendor,
  ): void => {
    query.set(key, value?.id.toString() ?? '');
    history.push({
      pathname: location.pathname,
      search: query.toString(),
    });
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Category list</h1>
      {isFiltering && (
        <div className="flex items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center  space-x-4">
            <ChevronLeftIcon onClick={history.goBack} />
            <h1 className="text-Gray-1 text-xl font-bold">{category?.name}</h1>
          </div>
        </div>
      )}
      {!isFiltering ? (
        <CategoryList
          categories={categories}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={handleCategorySelect}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          isLoading={transLoading || isLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          onFilter={handleTransFilter}
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
