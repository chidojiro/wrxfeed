import React from 'react';
import { RouteItem } from '@/routing/types';
import { Redirect } from 'react-router-dom';
import * as Sentry from '@sentry/react';

const TargetPage = React.lazy(() =>
  import('./TargetPage').then(({ TargetPage }) => ({
    default: TargetPage,
  })),
);

export const TargetRoutes: Record<string, RouteItem> = {
  Dashboard: {
    path: '/dashboard',
    component: () => <Redirect to="/dashboard/all-company" />,
  },
  DashboardAllCompany: {
    path: '/dashboard/:slug',
    component: Sentry.withProfiler(TargetPage, {
      name: 'TargetPage',
    }),
  },
};
