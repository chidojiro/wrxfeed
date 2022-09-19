import { UserRole } from '@/auth/constants';
import { RouteItem } from '@/routing/types';
import * as Sentry from '@sentry/react';
import React from 'react';

const CategoryPage = React.lazy(() =>
  import('./CategoryPage').then(({ CategoryPage }) => ({ default: CategoryPage })),
);

export const CategoryRoutes: Record<string, RouteItem> = {
  Category: {
    path: '/categories/:categoryId',
    component: Sentry.withProfiler(CategoryPage, { name: 'CategoryPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
