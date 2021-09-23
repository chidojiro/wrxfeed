import React from 'react';
import { Typography } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';
import DiscussionList from './DiscussionList';

const DiscussionPage: React.VFC = () => {
  return (
    <MainLayout title="Bird" boxStyle={{ overflowY: 'scroll' }}>
      <Typography variant="h1">Discussions</Typography>
      <DiscussionList />
    </MainLayout>
  );
};

export default DiscussionPage;
