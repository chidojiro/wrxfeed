import { UserRole } from '@/identity/constants';
import { RouteItem } from '@/routing/types';
import { VendorPage } from './VendorPage';
import { VendorsPage } from './VendorsPage';

export const VendorRoutes: Record<string, RouteItem> = {
  Dashboard: {
    path: '/vendors/:vendorId',
    component: VendorPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  DashboardAllCompany: {
    path: '/vendors',
    component: VendorsPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
