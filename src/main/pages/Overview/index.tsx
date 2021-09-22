import React from 'react';
import { Typography } from '@mui/material';
import MainLayout from '@common/templates/MainLayout';

const OverviewPage: React.VFC = () => {
  return (
    <MainLayout title="Bird">
      <Typography variant="h1">Overview</Typography>
    </MainLayout>
  );
};

export default OverviewPage;
