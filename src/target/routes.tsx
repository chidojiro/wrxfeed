import { UserRole } from '@/identity/constants';
import { RouteItem } from '@/routing/types';
import { TargetPage } from './TargetPage';

export const TargetRoutes: Record<string, RouteItem> = {
  Dashboard: {
    path: '/dashboard/:slug',
    component: TargetPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
