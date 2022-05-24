/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import * as Sentry from '@sentry/react';

import MainLayout from '@common/templates/MainLayout';
import { useTarget } from '@main/hooks';
import { TargetFilter } from '@api/types';
import { Department, Target } from '@main/entity';
// import TargetChartView from '@main/molecules/TargetChartView';

const GET_TARGETS_LIMIT = 10;

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

  const onPostTargetSuccess = () => {
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onPostTargetError = () => undefined;
  const onPutTargetSuccess = () => {
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onPutError = () => {};
  const onDeleteTargetSuccess = () => {
    setFilter({
      ...initFilter,
      timestamp: Date.now(),
    });
  };
  const onDeleteError = () => {};
  const { targets } = useTarget(
    filter,
    { onSuccess: onPostTargetSuccess, onError: onPostTargetError },
    { onSuccess: onPutTargetSuccess, onError: onPutError },
    { onSuccess: onDeleteTargetSuccess, onError: onDeleteError },
  );

  React.useEffect(() => {
    // console.log(`targets: ${JSON.stringify(targets)}`);
    console.log(`length: ${JSON.stringify(targets.length)}`);
  }, [targets]);

  return (
    <MainLayout>
      <h1 className="sr-only">Dashboard Page</h1>
      <div className="flex flex-wrap">
        <div />
      </div>
    </MainLayout>
  );
};

export default Sentry.withProfiler(DashboardPage, { name: 'FeedPage' });
