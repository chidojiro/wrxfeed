import { UserRole } from '@/auth/constants';
import { RouteItem } from '@/routing/types';
import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminPage = React.lazy(() =>
  import('./AdminPage').then(({ AdminPage }) => ({
    default: AdminPage,
  })),
);

export const AdminRoutes: Record<string, RouteItem> = {
  AdminRoot: {
    path: '/admin',
    component: () => <Redirect to="/admin/roles" push={false} exact />,
    // permissions: [UserRole.ADMIN]
  },
  Admin: {
    path: '/admin/:tab',
    component: AdminPage,
    // permissions: [UserRole.ADMIN]
  },
};
