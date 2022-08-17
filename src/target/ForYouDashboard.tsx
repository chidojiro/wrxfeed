import React from 'react';
import * as Sentry from '@sentry/react';
import TargetBoardSummaries from '@/main/organisms/TargetBoardSummaries';
import { TargetsByDepartment } from './TargetsByDepartment';

export const ForYouDashboard = Sentry.withProfiler(
  () => {
    return (
      <div>
        <h1 className="sr-only">For You Dashboard Page</h1>
        <TargetBoardSummaries />
        <TargetsByDepartment />
      </div>
    );
  },
  { name: 'ForYouDashboard' },
);
