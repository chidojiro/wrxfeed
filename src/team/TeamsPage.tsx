/* eslint-disable react-hooks/exhaustive-deps */
import { FeedFilters } from '@/api/types';
import { MainGroups } from '@/common/constants';
import { useLegacyQuery } from '@/common/hooks';
import MainLayout from '@/common/templates/MainLayout';
import { Department } from '@/main/entity';
import { FilterKeys } from '@/main/hooks';
import { useDepartment } from '@/main/hooks/department.hook';
import { useFeed } from '@/main/hooks/feed.hook';
import DepartmentList from '@/main/organisms/DepartmentList';
import { scrollToTop } from '@/main/utils';
import { PaginationParams } from '@/rest/types';
import * as Sentry from '@sentry/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const WrappedTeamsPage = () => {
  const history = useHistory();
  const { id: deptId } = useParams<{ id?: string }>();
  const query = useLegacyQuery();
  // Department states
  const [filter, setFilter] = useState<PaginationParams>(INIT_PAGINATION);
  const { departments, hasMore, isLoading } = useDepartment(filter);

  // Feeds states
  const [feedsFilter, setFeedsFilter] = useState<FeedFilters>(
    deptId
      ? {
          page: INIT_PAGINATION,
          rootDepartment: parseInt(deptId, 10),
        }
      : {
          page: { offset: 0, limit: 0 }, // Don't load feed items at the first launch
        },
  );
  const { cleanData } = useFeed(feedsFilter);

  const filterByRoute = useCallback(() => {
    if (deptId) {
      const idNum = parseInt(deptId, 10);
      const newFilter: { [key: string]: string | number | PaginationParams | null } = {
        page: INIT_PAGINATION,
        rootDepartment: idNum,
      };
      FilterKeys.forEach((key) => {
        if (query.get(key)) {
          newFilter[key] = query.get(key);
        }
      });
      cleanData();
      setFeedsFilter(newFilter);
    } else {
      setFeedsFilter({ page: { offset: 0, limit: 0 } }); // Clean up feed item
    }
  }, [deptId, query.toString(), feedsFilter.rootDepartment]);

  useEffect(() => {
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

  const handleDepartmentSelect = (value?: Department): void => {
    history.push({
      pathname: `/departments/${value?.id.toString()}`,
      search: `?route=${MainGroups.Following}`,
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

export const TeamsPage = Sentry.withProfiler(WrappedTeamsPage, { name: 'DepartmentsPage' });
