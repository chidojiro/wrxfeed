import React from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';
import { STATUS } from '@common/atoms/StatusTag';
import { Transaction } from '@main/types';
import TransactionList from '@main/organisms/TransactionList';
import IconButton from '@main/atoms/IconButton';
import { ReactComponent as UserPlusIcon } from '@assets/icons/outline/user-plus.svg';
import SvgColorIcon from '@common/atoms/SvgColorIcon';

const transactions: Transaction[] = [
  {
    id: '1',
    owner: {
      name: 'Professional Services',
    },
    date: Date.now(),
    amount: 17000.5,
    description: 'Google Analytics-Adservices',
    status: STATUS.NEW,
  },
  {
    id: '2',
    owner: {
      name: 'Rent',
    },
    date: Date.now(),
    amount: 4000.78,
    description: 'LA Brea Av3016865252',
  },
  {
    id: '3',
    owner: {
      name: 'Matt',
    },
    date: Date.now(),
    amount: 1045,
    description: 'GCP Sept Billings',
  },
  {
    id: '4',
    owner: {
      name: 'Join Wick',
    },
    date: Date.now(),
    amount: 200.78,
    description: 'AWS Sept Billing',
  },
  {
    id: '5',
    owner: {
      name: 'An Tran',
    },
    date: Date.now(),
    amount: 500.78,
    description: 'Google Admod',
  },
  {
    id: '6',
    owner: {
      name: 'Harry',
    },
    date: Date.now(),
    amount: 700.8,
    description: 'AWS Sept Billing',
  },
  {
    id: '7',
    owner: {
      name: 'Lam',
    },
    date: Date.now(),
    amount: 800.4,
    description: 'AWS Sept Billing',
  },
];

const OverviewPage: React.VFC = () => {
  return (
    <MainLayout title="Bird">
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Stack sx={{ height: '100%' }}>
            <Stack sx={{ height: 106 }} direction="row" justifyContent="space-between">
              <Typography variant="h1">Overview</Typography>
              <IconButton
                startIcon={
                  <SvgColorIcon component={UserPlusIcon} color="highlight" viewBox="-2 -2 22 22" />
                }
              >
                Invite Users
              </IconButton>
            </Stack>
            <Stack sx={{ position: 'relative', width: '100%' }} flexGrow={1}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  overflow: 'scroll',
                  paddingRight: 2,
                }}
              >
                <TransactionList transactions={transactions} />
              </Box>
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
