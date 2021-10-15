import React, { useCallback, useState } from 'react';
import MainLayout from '@common/templates/MainLayout';
import DepartmentList from '@main/organisms/DepartmentList';
import { Pagination } from '@api/types';
import { useDepartment } from '@main/hooks/department.hook';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const DepartmentsPage: React.VFC = () => {
  const companyName = 'Bird';
  const [filter, setFilter] = useState<Pagination>(INIT_PAGINATION);
  const { departments, hasMore, isLoading } = useDepartment(filter);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  // const clearFilter = (): void => {
  //   setFilter({ pagination: INIT_PAGINATION });
  // };

  // const onClickInviteUsers = () => setInviteModal(true);

  return (
    <MainLayout title={companyName}>
      <div className="w-full mx-auto sm:px-6 grid grid-cols-12 gap-8">
        <div className="col-span-9 h-full">
          {/* <Stack sx={{ height: 52 }} direction="row" justifyContent="space-between">
            <Stack spacing={1.5}>
              {!!filterTitle && <ChevronLeftIcon onClick={clearFilter} />} */}
          {/* <Typography variant="h1">{filterTitle || 'All Company'}</Typography> */}
          {/* </Stack> */}
          {/* <IconButton
                onClick={onClickInviteUsers}
                startIcon={
                  <SvgColorIcon
                    component={UserPlusIcon}
                    color="highlight"
                    width={15}
                    height={16}
                    viewBox="0 0 16 16"
                  />
                }
              >
                Invite Users
              </IconButton> */}
          {/* </Stack> */}
          <div className="relative h-full">
            <DepartmentList
              departments={departments}
              isLoading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </div>
        <aside className="col-span-3" />
      </div>
    </MainLayout>
  );
};

export default DepartmentsPage;
