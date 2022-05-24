import React, { useState } from 'react';
import * as Sentry from '@sentry/react';

import { useTarget } from '@main/hooks';
import { TargetFilter } from '@api/types';
import { Department, Target } from '@main/entity';
import MainLayout from '@common/templates/MainLayout';
import TargetSectionList from '@main/organisms/TargetSectionList';

const GET_TARGETS_LIMIT = 20;

const initFilter: TargetFilter = {
  offset: 0,
  limit: GET_TARGETS_LIMIT,
  forYou: 1,
  year: new Date().getFullYear(),
  timestamp: Date.now(),
};

export interface TargetByTeam {
  department: Department;
  targets: Target[];
}

const DashboardPage: React.VFC = () => {
  const [filter, setFilter] = useState<TargetFilter>(initFilter);
  const { targets, hasMore, isGetTargets } = useTarget(filter);

  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isGetTargets) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      limit: prevFilter?.limit ?? GET_TARGETS_LIMIT,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? GET_TARGETS_LIMIT),
    }));
  }, [hasMore, isGetTargets]);

  return (
    <MainLayout rightSide={false} mainClass="md:col-span-9 lg:col-span-9 xl:col-span-9 max-w-7xl">
      <h1 className="sr-only">Dashboard Page</h1>
      <TargetSectionList data={targets} isLoading={isGetTargets} onLoadMore={handleLoadMore} />
    </MainLayout>
  );
};

export default Sentry.withProfiler(DashboardPage, { name: 'Dashboard' });
