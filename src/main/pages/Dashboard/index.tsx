/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import * as Sentry from '@sentry/react';

import MainLayout from '@common/templates/MainLayout';
import { useTarget } from '@main/hooks';
import { TargetFilter } from '@api/types';
import { Department, Target } from '@main/entity';
import TargetChartView from '@main/molecules/TargetChartView';

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
  const gradientBg = 'linear-gradient(125.45deg, #CA77B3 18.62%, #514EE7 74.47%)';

  return (
    <MainLayout rightSide={false} mainClass="md:col-span-9 lg:col-span-9 xl:col-span-9 max-w-7xl">
      <h1 className="sr-only">Dashboard Page</h1>
      <div className="flex flex-1 flex-row flex-wrap">
        {targets.map((item: Target) => (
          <div
            key={`Dashboard-TargetChartView-${item.id}`}
            className="bg-white w-[500px] h-[292px] rounded-card shadow-shadowCard hover:shadow-targetHover flex flex-col mx-1 overflow-hidden my-3 border border-transparent hover:border-Accent-4"
          >
            <div
              className="flex h-2 w-full rounded-t-card"
              style={{
                background: gradientBg,
              }}
            />
            <div className="flex flex-1 flex-col overflow-hidden mb-2">
              <TargetChartView target={item} onEdit={() => undefined} />
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Sentry.withProfiler(DashboardPage, { name: 'FeedPage' });
