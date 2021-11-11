/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import CategoryList from '@main/organisms/CategoryList';
import { Pagination, TransactionFilter } from '@api/types';
import { useCategory } from '@main/hooks/category.hook';
import TransactionList from '@main/organisms/TransactionList';
import { useTransaction } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';
import { useHistory, useParams } from 'react-router-dom';
import { useSubscription } from '@main/hooks/subscription.hook';
import Button from '@common/atoms/Button';
// Icons
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CategoriesPage: React.VFC = () => {
  const history = useHistory();
  const { id: catId } = useParams<{ id?: string }>();
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
  // Subscription
  const { subscribe, unsubscribe, isFollowing } = useSubscription();
  // Variables
  const isFiltering = !!transFilter.category;
  const category = useMemo(() => {
    if (!isFiltering || !transactions.length) return null;
    if (transactions[0].category.id === transFilter.category) {
      return transactions[0].category;
    }
    return null;
  }, [isFiltering, transactions]);
  const isFollow = category && isFollowing('categories', category);

  const filterByRoute = useCallback(() => {
    if (catId) {
      const idNum = parseInt(catId, 10);
      if (idNum !== transFilter.category) {
        setTransFilter({
          pagination: INIT_PAGINATION,
          category: idNum,
        });
      }
    } else {
      setTransFilter({ pagination: { offset: 0, limit: 0 } }); // Clean up transaction
    }
  }, [catId, transFilter.category]);

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
    history.push(`/categories/${value?.toString()}`);
  };

  const clearFilter = (): void => {
    history.push('/categories');
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Category list</h1>
      {isFiltering && (
        <div className="flex items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center  space-x-4">
            <ChevronLeftIcon onClick={clearFilter} />
            <h1 className="text-Gray-1 text-xl font-bold">{category?.name}</h1>
          </div>
          {isFollow ? (
            <Button onClick={() => category && unsubscribe('categories', category)}>
              <TickIcon
                width={16}
                height={16}
                className="stroke-current path-no-stroke text-Gray-3"
                viewBox="0 0 15 15"
              />
              <span className="text-Gray-3">Following</span>
            </Button>
          ) : (
            <Button onClick={() => category && subscribe('categories', category)}>
              <AddIcon
                width={16}
                height={16}
                className="stroke-current path-no-stroke text-Gray-3"
                viewBox="0 0 15 15"
              />
              <span className="text-Gray-3">Follow</span>
            </Button>
          )}
        </div>
      )}
      {!isFiltering ? (
        <CategoryList
          categories={categories}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={({ id }) => handleTransFilter('category', id)}
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
