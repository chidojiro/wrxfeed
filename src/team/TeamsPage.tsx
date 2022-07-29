import { useLegacyQuery } from '@/common/hooks';
import { GetFeedsParams } from '@/feed/types';
import { MainLayout } from '@/layout/MainLayout';
import { Department } from '@/main/entity';
import { FilterKeys } from '@/main/hooks';
import { useDepartment } from '@/main/hooks/department.hook';
import DepartmentList from '@/main/organisms/DepartmentList';
import { scrollToTop } from '@/main/utils';
import { PaginationParams } from '@/rest/types';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

export const TeamsPage = () => {
  const history = useHistory();
  const { id: deptId } = useParams<{ id?: string }>();
  const query = useLegacyQuery();
  // Department states
  const [filter, setFilter] = React.useState<PaginationParams>(INIT_PAGINATION);
  const { departments, hasMore, isLoading } = useDepartment(filter);

  // Feeds states
  const [feedsFilter, setFeedsFilter] = React.useState<GetFeedsParams>(
    deptId
      ? {
          ...INIT_PAGINATION,
          rootDepartment: parseInt(deptId, 10),
        }
      : {
          // Don't load feed items at the first launch
          offset: 0,
          limit: 0,
        },
  );

  const filterByRoute = React.useCallback(() => {
    if (deptId) {
      const idNum = parseInt(deptId, 10);
      const newFilter: { [key: string]: string | number | PaginationParams | null } = {
        ...INIT_PAGINATION,
        rootDepartment: idNum,
      };
      FilterKeys.forEach((key) => {
        if (query.get(key)) {
          newFilter[key] = query.get(key);
        }
      });
      setFeedsFilter(newFilter);
    } else {
      setFeedsFilter({ offset: 0, limit: 0 }); // Clean up feed item
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deptId, query.toString(), feedsFilter.rootDepartment]);

  React.useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
    filterByRoute();
  }, [filterByRoute]);

  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  const handleDepartmentSelect = (value?: Department): void => {
    history.push({
      pathname: `/departments/${value?.id.toString()}`,
    });
    scrollToTop();
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      <DepartmentList
        departments={departments}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onSelect={handleDepartmentSelect}
        onSelectRoot={handleDepartmentSelect}
      />
    </MainLayout>
  );
};
