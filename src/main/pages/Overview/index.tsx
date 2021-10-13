import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import MainLayout from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import IconButton from '@main/atoms/IconButton';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import { showInviteModalState } from '@main/organisms/InviteModal/states';
import { useTransaction } from '@main/hooks';
import { TransactionFilter } from '@api/types';
import { ReactComponent as UserPlusIcon } from '@assets/icons/outline/user-plus.svg';
import { ReactComponent as ChevronLeftIcon } from '@assets/icons/outline/chevron-left.svg';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const OverviewPage: React.VFC = () => {
  const companyName = 'Bird';
  const setInviteModal = useSetRecoilState(showInviteModalState);
  const [filterTitle, setFilterTitle] = useState('');
  const [filter, setFilter] = useState<TransactionFilter>({
    pagination: INIT_PAGINATION,
  });
  const { transactions, hasMore, isLoading } = useTransaction(filter);

  useEffect(() => {
    const filterValue = Object.values(filter).find((value) => typeof value === 'string');
    if (filterValue) {
      setFilterTitle(filterValue);
    } else {
      setFilterTitle('');
    }
  }, [filter]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      pagination: {
        limit: prevFilter?.pagination?.limit ?? 0,
        offset: (prevFilter?.pagination?.offset ?? 0) + (prevFilter?.pagination?.limit ?? 0),
      },
    }));
  }, [hasMore, isLoading]);

  const handleFilter = (key: keyof TransactionFilter, value?: string): void => {
    setFilter({
      pagination: INIT_PAGINATION,
      [key]: value,
    });
  };

  const clearFilter = (): void => {
    setFilter({ pagination: INIT_PAGINATION });
  };

  const onClickInviteUsers = () => setInviteModal(true);

  return (
    <MainLayout title={companyName}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Stack sx={{ height: '100%' }}>
            <Stack sx={{ height: 106 }} direction="row" justifyContent="space-between">
              <Stack spacing={1.5}>
                {!!filterTitle && <ChevronLeftIcon onClick={clearFilter} />}
                <Typography variant="h1">{filterTitle || 'All Company'}</Typography>
              </Stack>
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
            </Stack>
            <Stack sx={{ position: 'relative', width: '100%' }} flexGrow={1}>
              <TransactionList
                transactions={transactions}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onFilter={handleFilter}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Box />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default OverviewPage;
