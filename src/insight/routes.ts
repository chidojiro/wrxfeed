import { RouteItem } from '@/routing/types';
import * as Sentry from '@sentry/react';
import React from 'react';

const InsightPage = React.lazy(() =>
  import('./InsightPage').then(({ InsightPage }) => ({ default: InsightPage })),
);

export const InsightRoutes: Record<string, RouteItem> = {
  Insight: {
    path: '/insights',
    component: Sentry.withProfiler(InsightPage, { name: 'InsightPage' }),
  },
  UpdateInsight: {
    path: '/insights/:insightId',
    component: Sentry.withProfiler(InsightPage, { name: 'InsightPage' }),
  },
};
