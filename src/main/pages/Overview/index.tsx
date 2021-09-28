import React from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import IconButton from '@main/atoms/IconButton';
import { ReactComponent as UserPlusIcon } from '@assets/icons/outline/user-plus.svg';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import MentionPopover from '@main/atoms/MentionPopover';
import UploadCSVModal from '../../organisms/UploadCSVModal';

const OverviewPage: React.VFC = () => {
  const companyName = 'Bird';
  return (
    <MainLayout title={companyName}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Stack sx={{ height: '100%' }}>
            <Stack sx={{ height: 106 }} direction="row" justifyContent="space-between">
              <Typography variant="h1">Company</Typography>
              <IconButton
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
                <TransactionList />
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Box />
        </Grid>
      </Grid>
      <UploadCSVModal />
      <MentionPopover />
    </MainLayout>
  );
};

export default OverviewPage;
