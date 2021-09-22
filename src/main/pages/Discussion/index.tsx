import React from 'react';
import { Typography } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';

const DiscussionPage: React.VFC = () => {
  return (
    <MainLayout title="Bird">
      <Typography variant="h1">Discussions</Typography>
    </MainLayout>
  );
};

export default DiscussionPage;
