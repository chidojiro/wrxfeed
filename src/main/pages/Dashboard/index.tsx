import React from 'react';
import * as Sentry from '@sentry/react';
import MainLayout from '@common/templates/MainLayout';
import TargetSectionList from '@main/organisms/TargetSectionList';

const DashboardPage: React.VFC = () => {
  return (
    <MainLayout rightSide={false} mainClass="md:col-span-9 lg:col-span-9 xl:col-span-9 max-w-7xl">
      <h1 className="sr-only">Dashboard Page</h1>
      <TargetSectionList enableLoadMore />
    </MainLayout>
  );
};

export default Sentry.withProfiler(DashboardPage, { name: 'Dashboard' });
