/* eslint-disable react-hooks/exhaustive-deps */
import { FeedFilters } from '@/api/types';
import { ReactComponent as ChevronLeftIcon } from '@/assets/icons/outline/chevron-left.svg';
import { MainGroups } from '@/common/constants';
import { useLegacyQuery } from '@/common/hooks';
import MainLayout from '@/common/templates/MainLayout';
import { FeedApis } from '@/feed/apis';
import { Category, Department, Vendor } from '@/main/entity';
import { useCategory } from '@/main/hooks/category.hook';
import CategoryList from '@/main/organisms/CategoryList';
import FeedList from '@/main/organisms/FeedList';
import { scrollToTop } from '@/main/utils';
import { PaginationParams } from '@/rest/types';
import * as Sentry from '@sentry/react';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useFetcher } from '@/common/hooks';

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
  const [filter, setFilter] = React.useState<PaginationParams>(INIT_PAGINATION);
  const { categories, hasMore, isLoading } = useCategory({ filter });
  const [category, setCategory] = React.useState<Category | null>();

  const handleLoadMoreCategories = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  useFetcher(
    catId && !isNaN(+catId) && ['category', catId],
    () => FeedApis.getCategory(parseInt(catId ?? '0', 10)),
    {
      onSuccess: setCategory,
    },
  );

  const handleCategorySelect = (value?: Category): void => {
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
      {catId && (
        <div className="flex items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center  space-x-4">
            <ChevronLeftIcon onClick={history.goBack} />
            <h1 className="text-Gray-1 text-xl font-bold">{category?.name}</h1>
          </div>
        </div>
      )}
      {!catId && (
        <CategoryList
          categories={categories}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMoreCategories}
          onSelect={handleCategorySelect}
        />
      )}
      {catId && !isNaN(+catId) && (
        <FeedList onFilter={handleFeedsFilter} categoryId={parseInt(catId, 10)} />
      )}
    </MainLayout>
  );
};

export default Sentry.withProfiler(CategoriesPage, { name: 'CategoriesPage' });
