/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import DepartmentList from '@main/organisms/DepartmentList';
import { GetFeedsFilters, Pagination } from '@api/types';
import { useDepartment } from '@main/hooks/department.hook';
import { FilterKeys } from '@main/hooks';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';
import { Category, Department, Vendor } from '@main/entity';
import { useSubscription } from '@main/hooks/subscription.hook';
import Button from '@common/atoms/Button';
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';
import { MouseEventHandler } from 'react-router/node_modules/@types/react';
import { MainGroups } from '@common/constants';
import { useQuery } from '@common/hooks';
import { useFeed } from '@main/hooks/feed.hook';
import FeedList from '@main/organisms/FeedList';

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
  const { subscribe, unsubscribe, isFollowing } = useSubscription();
  // Feeds states
  const [feedsFilter, setFeedsFilter] = useState<GetFeedsFilters>(
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
  // Variables
  const inDirectoryList = query.get('route') !== MainGroups.Feeds;
  const isFiltering = inDirectoryList
    ? !!feedsFilter.page?.offset || !!feedsFilter.page?.limit
    : FilterKeys.some((key) => query.has(key));
  const deptSelect = useMemo(() => {
    if (!isFiltering || !feeds.length) return null;
    if (feeds[0].department.id === feedsFilter.rootDepartment) {
      return feeds[0].department;
    }
    if (feeds[0].department.parent?.id === feedsFilter.rootDepartment) {
      return feeds[0].department.parent;
    }
    return null;
  }, [isFiltering, feeds]);
  const isFollow = deptSelect && isFollowing('departments', deptSelect);

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

  const handleFeedsLoadMore = useCallback(() => {
    if (!hasMoreFeeds || feedsLoading) return;
    setFeedsFilter((prevFilter) => ({
      ...prevFilter,
      pagination: {
        limit: prevFilter?.page?.limit ?? 0,
        offset: (prevFilter?.page?.offset ?? 0) + (prevFilter?.page?.limit ?? 0),
      },
    }));
  }, [hasMoreFeeds, feedsLoading]);

  const handleDepartmentSelect = (value?: Department): void => {
    history.push({
      pathname: `/departments/${value?.id.toString()}`,
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

  const handleFollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) subscribe('departments', deptSelect);
  };

  const handleUnfollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) unsubscribe('departments', deptSelect);
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      {isFiltering && (
        <div className="flex px-4 sm:px-0 items-center justify-between space-x-4 pb-8">
          <div className="flex flex-1 items-center space-x-4">
            <ChevronLeftIcon onClick={history.goBack} />
            <h1 className="text-Gray-1 text-xl font-bold">{deptSelect?.name ?? ''}</h1>
          </div>
          {isFollow ? (
            <Button onClick={handleUnfollow} className="group block relative">
              <TickIcon
                width={16}
                height={16}
                className="stroke-current path-no-stroke text-Gray-3 flex group-hover:hidden"
                viewBox="0 0 15 15"
              />
              <span className="flex group-hover:hidden">Following</span>
              <span className="group-hover:flex hidden">Unfollow</span>
            </Button>
          ) : (
            <Button onClick={handleFollow}>
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
        <FeedList
          feeds={feeds}
          isLoading={feedsLoading || isLoading}
          hasMore={hasMoreFeeds}
          onLoadMore={handleFeedsLoadMore}
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

export default DepartmentsPage;
