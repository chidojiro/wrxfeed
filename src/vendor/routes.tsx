import { RouteItem } from '@/routing/types';
import * as Sentry from '@sentry/react';
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
    component: Sentry.withProfiler(VendorPage, { name: 'VendorPage' }),
  },
  Vendors: {
    path: '/vendors',
    component: Sentry.withProfiler(VendorsPage, { name: 'VendorsPage' }),
  },
};
