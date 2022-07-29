import { ChevronLeftIcon } from '@/assets';
import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { Feeds } from '@/feed/Feeds';
import { GetCategoriesParams } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { Category } from '@/main/entity';
import { useCategory } from '@/main/hooks/category.hook';
import CategoryList from '@/main/organisms/CategoryList';
import * as Sentry from '@sentry/react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CategoriesPage: React.FC = () => {
  const history = useHistory();
  const { id: catId } = useParams<{ id?: string }>();
  const [filter, setFilter] = React.useState<GetCategoriesParams>(INIT_PAGINATION);
  const { categories, hasMore, isLoading } = useCategory({ params: filter });
  const [category, setCategory] = React.useState<Category | null>();

  const handleLoadMoreCategories = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useFetcher(catId && !isNaN(+catId) && ['category', catId], () => FeedApis.getCategory(+catId!), {
    onSuccess: setCategory,
  });

  const handleCategorySelect = (value?: Category): void => {
    setCategory(value);
    history.push({
      pathname: `/categories/${value?.id.toString()}`,
    });
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
      {catId && !isNaN(+catId) && <Feeds categoryId={parseInt(catId, 10)} />}
    </MainLayout>
  );
};

export default Sentry.withProfiler(CategoriesPage, { name: 'CategoriesPage' });
