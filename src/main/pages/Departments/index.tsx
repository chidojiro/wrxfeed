/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { useQuery } from '@common/hooks';
import { useFeed } from '@main/hooks/feed.hook';
import { useDepartment } from '@main/hooks/department.hook';

import { Category, Department, Vendor } from '@main/entity';
import { FeedFilters, Pagination } from '@api/types';
import { FilterKeys } from '@main/hooks';
import { scrollToTop } from '@main/utils';
import { MainGroups } from '@common/constants';

import FeedList from '@main/organisms/FeedList';
import MainLayout from '@common/templates/MainLayout';
import DepartmentList from '@main/organisms/DepartmentList';
import TeamHome from '@main/organisms/TeamHome';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const DepartmentsPage: React.VFC = () => {
  const history = useHistory();
  const { id: deptId } = useParams<{ id?: string }>();
  const query = useQuery();
  const location = useLocation();
  // Department states
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
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
  const {
    feeds,
    hasMore: hasMoreFeeds,
    isLoading: feedsLoading,
    updateCategory,
    cleanData,
  } = useFeed(feedsFilter);

  const inDirectoryList = query.get('route') !== MainGroups.Feeds;
  const isFiltering = inDirectoryList
    ? !!feedsFilter.page?.offset || !!feedsFilter.page?.limit
    : FilterKeys.some((key) => query.has(key));

  const deptSelect = useMemo(() => {
    if (!feeds.length) return null;
    if (feeds[0].department.id === feedsFilter?.rootDepartment) {
      return feeds[0].department;
    }

    if (feeds[0].department.parent?.id === feedsFilter.rootDepartment) {
      return feeds[0].department.parent;
    }
    return null;
  }, [isFiltering, feeds]);

  const filterByRoute = useCallback(() => {
    if (deptId) {
      const idNum = parseInt(deptId, 10);
      const newFilter: { [key: string]: string | number | Pagination | null } = {
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

  const handleFeedsLoadMore = useCallback(() => {
    if (!hasMoreFeeds || feedsLoading) return;
    setFeedsFilter((prevFilter) => ({
      ...prevFilter,
      page: {
        limit: prevFilter?.page?.limit ?? 0,
        offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? 0),
      },
    }));
  }, [hasMoreFeeds, feedsLoading]);

  const handleDepartmentSelect = (value?: Department): void => {
    history.push({
      pathname: `/departments/${value?.id.toString()}`,
      search: `?route=${MainGroups.Following}`,
    });
    scrollToTop();
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
      <h1 className="sr-only">Department list</h1>
      {!isFiltering && inDirectoryList ? (
        <DepartmentList
          departments={departments}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={handleDepartmentSelect}
          onSelectRoot={handleDepartmentSelect}
        />
      ) : (
        <>
          {deptId && <TeamHome deptSelect={deptSelect} depId={parseInt(deptId, 10)} />}
          <FeedList
            feeds={feeds}
            isLoading={feedsLoading || isLoading}
            hasMore={hasMoreFeeds}
            onLoadMore={handleFeedsLoadMore}
            onFilter={handleFeedsFilter}
            updateCategory={updateCategory}
          />
        </>
      )}
    </MainLayout>
  );
};

export default Sentry.withProfiler(DepartmentsPage, { name: 'DepartmentsPage' });
