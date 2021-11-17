/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import DepartmentList from '@main/organisms/DepartmentList';
import { Pagination, TransactionFilter } from '@api/types';
import { useDepartment } from '@main/hooks/department.hook';
import { useTransaction } from '@main/hooks';
import TransactionList from '@main/organisms/TransactionList';
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
import routes from '@src/routes';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const DepartmentsPage: React.VFC = () => {
  const history = useHistory();
  const { id: deptId } = useParams<{ id?: string }>();
  const query = useQuery();
  // Department states
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { departments, hasMore, isLoading } = useDepartment(filter);
  const { subscribe, unsubscribe, isFollowing } = useSubscription();
  // Transaction states
  const [transFilter, setTransFilter] = useState<TransactionFilter>(
    deptId
      ? {
          pagination: INIT_PAGINATION,
          rootDepartment: parseInt(deptId, 10),
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
  const isFiltering = !!transFilter.rootDepartment;
  const deptSelect = useMemo(() => {
    if (!isFiltering || !transactions.length) return null;
    if (transactions[0].department.id === transFilter.rootDepartment) {
      return transactions[0].department;
    }
    if (transactions[0].department.parent?.id === transFilter.rootDepartment) {
      return transactions[0].department.parent;
    }
    return null;
  }, [isFiltering, transactions]);
  const isFollow = deptSelect && isFollowing('departments', deptSelect);
  const inDirectoryList = query.get('route') !== MainGroups.Feeds; // Only show Back button when the filter list is in Directories

  const filterByRoute = useCallback(() => {
    if (deptId) {
      const idNum = parseInt(deptId, 10);
      if (idNum !== transFilter.rootDepartment) {
        setTransFilter({
          pagination: INIT_PAGINATION,
          rootDepartment: idNum,
        });
      }
    } else {
      setTransFilter({ pagination: { offset: 0, limit: 0 } }); // Clean up transaction
    }
  }, [deptId, transFilter.rootDepartment]);

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

  const handleTransFilter = (
    key: keyof TransactionFilter,
    value?: Department | Category | Vendor,
  ): void => {
    if (inDirectoryList) {
      history.push({
        pathname: `/departments/${value?.id.toString()}`,
        search: `?route=${MainGroups.Directories}`,
      });
      return;
    }

    // Push back to overview if page is feed list
    const queryString = `?${key}=${value?.id}`;
    history.push({
      pathname: routes.Overview.path as string,
      search: queryString,
    });
  };

  const clearFilter = (): void => {
    history.push('/departments');
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
            {inDirectoryList && <ChevronLeftIcon onClick={clearFilter} />}
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
      {!isFiltering ? (
        <DepartmentList
          departments={departments}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onSelect={(dept) => handleTransFilter('department', dept)}
          onSelectRoot={(dept) => handleTransFilter('rootDepartment', dept)}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          isLoading={transLoading || isLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          onFilter={inDirectoryList ? undefined : handleTransFilter}
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
