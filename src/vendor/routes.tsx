import { UserRole } from '@/identity/constants';
import { RouteItem } from '@/routing/types';
import React from 'react';

const VendorPage = React.lazy(() =>
  import('./VendorPage').then(({ VendorPage }) => ({ default: VendorPage })),
);

const VendorsPage = React.lazy(() =>
  import('./VendorsPage').then(({ VendorsPage }) => ({ default: VendorsPage })),
);

export const VendorRoutes: Record<string, RouteItem> = {
  Vendor: {
    path: '/vendors/:vendorId',
    component: VendorPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Vendors: {
    path: '/vendors',
    component: VendorsPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
