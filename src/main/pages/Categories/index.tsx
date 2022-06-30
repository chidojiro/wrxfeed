/* eslint-disable react-hooks/exhaustive-deps */
import { FeedFilters } from '@/api/types';
import { ReactComponent as ChevronLeftIcon } from '@/assets/icons/outline/chevron-left.svg';
import { MainGroups } from '@/common/constants';
import { useLegacyQuery } from '@/common/hooks';
import MainLayout from '@/common/templates/MainLayout';
import { Category, Department, Vendor } from '@/main/entity';
import { FilterKeys } from '@/main/hooks';
import { useCategory } from '@/main/hooks/category.hook';
import { useFeed } from '@/main/hooks/feed.hook';
import CategoryList from '@/main/organisms/CategoryList';
import FeedList from '@/main/organisms/FeedList';
import { scrollToTop } from '@/main/utils';
import { PaginationParams } from '@/rest/types';
import * as Sentry from '@sentry/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CategoriesPage: React.VFC = () => {
  const history = useHistory();
  const { id: catId } = useParams<{ id?: string }>();
  const query = useLegacyQuery();
  const location = useLocation();
  // Category states
  const [filter, setFilter] = useState<PaginationParams>(INIT_PAGINATION);
  const { categories, hasMore, isLoading } = useCategory({ filter });
  // Feeds states
  const [feedsFilter, setFeedsFilter] = useState<FeedFilters>(
    catId
      ? {
          page: { offset: 0, limit: 0 },
          category: parseInt(catId, 10),
        }
      : {
          page: { offset: 0, limit: 0 }, // Don't load feed at the first launch
        },
  );

  const { feeds, cleanData } = useFeed(feedsFilter);
  // Variables
  const isFiltering = !!feedsFilter.category;
  const [category, setCategory] = useState<Category | null>();

  React.useEffect(() => {
    if (!isFiltering || feeds.length === 0) return;
    if (feeds[0]?.category?.id === feedsFilter?.category) {
      setCategory(feeds[0]?.category);
    }
  }, [feeds, isFiltering]);

  const filterByRoute = useCallback(() => {
    if (catId) {
      const newFilter: { [key: string]: string | number | PaginationParams | null } = {
        page: INIT_PAGINATION,
        category: parseInt(catId, 10),
      };
      FilterKeys.forEach((key) => {
        if (query.get(key)) {
          newFilter[key] = query.get(key);
        }
      });
      setFeedsFilter(newFilter);
    } else {
      setFeedsFilter({ page: { offset: 0, limit: 0 } }); // Clean up feed
    }
  }, [catId, query.toString(), feedsFilter.category]);

  useEffect(() => {
    scrollToTop();
    filterByRoute();
  }, [filterByRoute]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  const handleCategorySelect = (value?: Category): void => {
    cleanData();
    setCategory(value);
    history.push({
      pathname: `/categories/${value?.id.toString()}`,
      search: `?route=${MainGroups.Following}`,
    });
  };

  const handleFeedsFilter = (
    key: keyof FeedFilters,
    value?: Department | Category | Vendor,
  ): void => {
    query.set(key, value?.id.toString() ?? '');
    history.push({
      pathname: location.pathname,
      search: query.toString(),
    });
    scrollToTop();
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
        <FeedList
          onFilter={handleFeedsFilter}
          categoryId={catId ? parseInt(catId, 10) : undefined}
        />
      )}
    </MainLayout>
  );
};

export default Sentry.withProfiler(CategoriesPage, { name: 'CategoriesPage' });
