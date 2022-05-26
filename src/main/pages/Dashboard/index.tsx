import React, { useState } from 'react';
import * as Sentry from '@sentry/react';

import { useTarget } from '@main/hooks';
import { TargetFilter } from '@api/types';
import MainLayout from '@common/templates/MainLayout';
import TargetSectionList from '@main/organisms/TargetSectionList';
import { filterTargetsToTargetByTeam } from '@main/utils';

const GET_TARGETS_LIMIT = 40;

const initFilter: TargetFilter = {
  offset: 0,
  limit: GET_TARGETS_LIMIT,
  forYou: 1,
  year: new Date().getFullYear(),
  timestamp: Date.now(),
};

const DashboardPage: React.VFC = () => {
  const [filter, setFilter] = useState<TargetFilter>(initFilter);
  const { targets, hasMore, isGetTargets } = useTarget(filter);

  const targetByTeam = React.useMemo(() => {
    return filterTargetsToTargetByTeam(targets);
  }, [targets]);

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
      <TargetSectionList
        data={targetByTeam}
        isLoading={isGetTargets}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        enableLoadMore={false}
      />
    </MainLayout>
  );
};

export default Sentry.withProfiler(DashboardPage, { name: 'Dashboard' });
