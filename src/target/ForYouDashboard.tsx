import React from 'react';
import * as Sentry from '@sentry/react';
import TargetSectionList from '@/main/organisms/TargetSectionList';
import TargetBoardSummaries from '@/main/organisms/TargetBoardSummaries';

export const ForYouDashboard = Sentry.withProfiler(
  () => {
    return (
      <div>
        <h1 className="sr-only">For You Dashboard Page</h1>
        <TargetBoardSummaries />
        <TargetSectionList enableLoadMore />
      </div>
    );
  },
  { name: 'ForYouDashboard' },
);
