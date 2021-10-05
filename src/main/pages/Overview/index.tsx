import React from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import MainLayout from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import IconButton from '@main/atoms/IconButton';
import { ReactComponent as UserPlusIcon } from '@assets/icons/outline/user-plus.svg';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import { showInviteModalState } from '@main/organisms/InviteModal/states';

const OverviewPage: React.VFC = () => {
  const companyName = 'Bird';
  const setInviteModal = useSetRecoilState(showInviteModalState);
  const onClickInviteUsers = () => setInviteModal(true);
  return (
    <MainLayout title={companyName}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Stack sx={{ height: '100%' }}>
            <Stack sx={{ height: 106 }} direction="row" justifyContent="space-between">
              <Typography variant="h1">Company</Typography>
              <IconButton
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
              </IconButton>
            </Stack>
            <Stack sx={{ position: 'relative', width: '100%' }} flexGrow={1}>
              <TransactionList />
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
