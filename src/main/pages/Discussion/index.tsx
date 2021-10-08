import React from 'react';
import { Typography } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';
import { TransactionModal } from '@main/organisms';
import DiscussionList from '../../organisms/DiscussionList';

const DiscussionPage: React.VFC = () => {
  return (
    <MainLayout title="Bird" boxStyle={{ overflowY: 'scroll' }}>
      <Typography variant="h1">Inbox</Typography>
      <DiscussionList />
      <TransactionModal />
    </MainLayout>
  );
};

export default DiscussionPage;
