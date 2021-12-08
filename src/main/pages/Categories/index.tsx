/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import CategoryList from '@main/organisms/CategoryList';
import { GetFeedsFilters, Pagination } from '@api/types';
import { useCategory } from '@main/hooks/category.hook';
import { FilterKeys } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Category, Department, Vendor } from '@main/entity';
import { MainGroups } from '@common/constants';
import { useQuery } from '@common/hooks';
import FeedList from '@main/organisms/FeedList';
import { useFeed } from '@main/hooks/feed.hook';

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
  // Feeds states
  const [feedsFilter, setFeedsFilter] = useState<GetFeedsFilters>(
    catId
      ? {
          page: INIT_PAGINATION,
          category: parseInt(catId, 10),
        }
      : {
          page: { offset: 0, limit: 0 }, // Don't load feed at the first launch
        },
  );

  const {
    feeds,
    hasMore: hasMoreTrans,
    isLoading: feedsLoading,
    updateCategory,
    cleanData,
  } = useFeed(feedsFilter);
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
      const newFilter: { [key: string]: string | number | Pagination | null } = {
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
    if (!hasMoreTrans || feedsLoading) return;
    setFeedsFilter((prevFilter) => ({
      ...prevFilter,
      page: {
        limit: prevFilter?.page?.limit ?? 0,
        offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? 0),
      },
    }));
  }, [hasMoreTrans, feedsLoading]);

  const handleCategorySelect = (value?: Category): void => {
    cleanData();
    setCategory(value);
    history.push({
      pathname: `/categories/${value?.id.toString()}`,
      search: `?route=${MainGroups.Directories}`,
    });
  };

  const handleFeedsFilter = (
    key: keyof GetFeedsFilters,
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
        <FeedList
          feeds={feeds}
          isLoading={feedsLoading || isLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          onFilter={handleFeedsFilter}
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
