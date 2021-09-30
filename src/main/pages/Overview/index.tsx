import React from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import MainLayout from '@common/templates/MainLayout';
import TransactionList from '@main/organisms/TransactionList';
import IconButton from '@main/atoms/IconButton';
import { ReactComponent as UserPlusIcon } from '@assets/icons/outline/user-plus.svg';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import MentionPopover from '@main/organisms/MentionPopover';
import AttachmentModal from '@main/organisms/AttachmentModal';
import { showInviteModalState } from '@main/organisms/InviteModal/states';
// import CommentBox from '@main/molecules/CommentBox';
import UploadCSVModal from '../../organisms/UploadCSVModal';
import InviteModal from '../../organisms/InviteModal';

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
                {/* <CommentBox style={{ marginTop: '500px' }} onSubmit={() => undefined} /> */}
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Box />
        </Grid>
      </Grid>
      <UploadCSVModal />
      <AttachmentModal />
      <MentionPopover onSelectUser={() => undefined} />
      <InviteModal />
    </MainLayout>
  );
};

export default OverviewPage;
