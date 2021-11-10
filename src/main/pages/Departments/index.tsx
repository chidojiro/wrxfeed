import React, { useCallback, useState } from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import DepartmentList from '@main/organisms/DepartmentList';
import { Pagination, TransactionFilter } from '@api/types';
import { useDepartment } from '@main/hooks/department.hook';
import { useTransaction } from '@main/hooks';
import TransactionList from '@main/organisms/TransactionList';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';
import TargetPanel from '@main/organisms/TargetPanel';
import { Department } from '@main/entity';
import { useSubscription } from '@main/hooks/subscription.hook';
import Button from '@common/atoms/Button';
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';
import { MouseEventHandler } from 'react-router/node_modules/@types/react';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const DepartmentsPage: React.VFC = () => {
  // Department states
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { departments, hasMore, isLoading } = useDepartment(filter);
  const [isFollow, setFollow] = useState<boolean>(false);
  const [deptSelect, setDeptSelect] = useState<Department>();
  const { subscribe, unsubscribe, isFollowing } = useSubscription();
  // Transaction states
  const [transFilter, setTransFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const [filterTitle, setFilterTitle] = useState('');
  const {
    transactions,
    hasMore: hasMoreTrans,
    isLoading: transLoading,
    updateCategory,
  } = useTransaction(transFilter);
  // Variables
  const isFiltering = !!transFilter.department || !!transFilter.rootDepartment;

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

  const handleTransFilter = (key: keyof TransactionFilter, dept?: Department): void => {
    setTransFilter({
      pagination: INIT_PAGINATION,
      [key]: dept?.id,
    });

    setFilterTitle(dept?.name || '');
    if (dept) {
      setDeptSelect(dept);
      setFollow(isFollowing('departments', dept));
    }
  };

  const clearFilter = (): void => {
    setTransFilter({ pagination: INIT_PAGINATION });
  };

  // const onFollow = subscribe('departments', dept);
  // const onUnfollow = () => unsubscribe('departments', dept);

  const handleFollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) subscribe('departments', deptSelect);
    setFollow(true);
  };

  const handleUnfollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (deptSelect) unsubscribe('departments', deptSelect);
    setFollow(false);
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Department list</h1>
      {isFiltering && (
        <div className="flex items-center space-x-4 pb-8">
          <ChevronLeftIcon onClick={clearFilter} />
          <div className="flex flex-row justify-between w-full">
            <h1 className="text-Gray-1 text-xl font-bold">{filterTitle}</h1>
            {isFollow ? (
              <Button onClick={handleUnfollow}>
                <TickIcon
                  width={16}
                  height={16}
                  className="stroke-current path-no-stroke text-Gray-3"
                  viewBox="0 0 15 15"
                />
                <span className="text-Gray-3">Following</span>
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
          isLoading={transLoading}
          hasMore={hasMoreTrans}
          onLoadMore={handleTransLoadMore}
          // onFilter={handleTransFilter}
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
