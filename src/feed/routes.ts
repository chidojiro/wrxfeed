import { UserRole } from '@/identity/constants';
import { RouteItem } from '@/routing/types';
import { ForYouPage } from './ForYouPage';

export const FeedRoutes: Record<string, RouteItem> = {
  ForYou: {
    path: '/for-you',
    component: ForYouPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
