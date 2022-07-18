import { UserRole } from '@/identity/constants';
import { RouteItem } from '@/routing/types';
import * as Sentry from '@sentry/react';
import React from 'react';

const TeamPage = React.lazy(() =>
  import('./TeamPage').then(({ TeamPage }) => ({ default: TeamPage })),
);

const TeamsPage = React.lazy(() =>
  import('./TeamsPage').then(({ TeamsPage }) => ({ default: TeamsPage })),
);

export const TeamRoutes: Record<string, RouteItem> = {
  Department: {
    path: ['/departments/:id'],
    component: Sentry.withProfiler(TeamPage, { name: 'TeamPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Departments: {
    path: ['/departments'],
    component: Sentry.withProfiler(TeamsPage, { name: 'TeamsPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
