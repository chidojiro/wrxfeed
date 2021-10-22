import React from 'react';
// import { Typography } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';
import { TransactionModal } from '@main/organisms';
import DiscussionList from '../../organisms/DiscussionList';

const DiscussionPage: React.VFC = () => {
  return (
    <MainLayout>
      {/* <Typography variant="h1">For you</Typography> */}
      <DiscussionList />
      <TransactionModal />
    </MainLayout>
  );
};

export default DiscussionPage;
