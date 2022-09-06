import { RouteItem } from '@/routing/types';
import React from 'react';

const AdminPage = React.lazy(() =>
  import('./AdminPage').then(({ AdminPage }) => ({
    default: AdminPage,
  })),
);

export const AdminRoutes: Record<string, RouteItem> = {
  Admin: {
    path: '/admin/:tab',
    component: AdminPage,
  },
};
