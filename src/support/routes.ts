import { UserRole } from '@/auth/constants';
import { RouteItem } from '@/routing/types';
import * as Sentry from '@sentry/react';
import React from 'react';

const SupportPage = React.lazy(() =>
  import('./SupportPage').then(({ SupportPage }) => ({ default: SupportPage })),
);

export const SupportRoutes: Record<string, RouteItem> = {
  Support: {
    path: '/support',
    component: Sentry.withProfiler(SupportPage, { name: 'SupportPage' }),
    permissions: [UserRole.EMPLOYEE],
  },
};
