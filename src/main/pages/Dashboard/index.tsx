/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import * as Sentry from '@sentry/react';

import MainLayout from '@common/templates/MainLayout';

const DashboardPage: React.VFC = () => {
  return (
    <MainLayout>
      <h1 className="sr-only">Dashboard Page</h1>
    </MainLayout>
  );
};

export default Sentry.withProfiler(DashboardPage, { name: 'FeedPage' });
