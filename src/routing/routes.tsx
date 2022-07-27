import { UserRole } from '@/auth/constants';
import { NotFoundPage } from '@/auth/NotFoundPage';
import AcceptInvitation from '@/auth/pages/AcceptInvitation';
import Login from '@/auth/pages/LoginPage';
import Onboard from '@/auth/pages/OnboardPage';
import { FeedRoutes } from '@/feed/routes';
import Categories from '@/main/pages/Categories';
import Feed from '@/main/pages/Feed';
import Notifications from '@/main/pages/Notifications';
import { TargetRoutes } from '@/target/routes';
import { TeamRoutes } from '@/team/routes';
import { VendorRoutes } from '@/vendor/routes';
import { Route } from './types';

export const Routes: Route = {
  // Public pages
  Login: {
    path: '/login',
    component: Login,
  },
  AcceptInvitation: {
    path: '/accept-invitation',
    component: AcceptInvitation,
  },
  PageNotFound: {
    path: '/404',
    component: NotFoundPage,
  },
  // Protected pages
  Feed: {
    path: '/feed/:id',
    component: Feed,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Onboard: {
    path: '/onboarding',
    component: Onboard,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Notifications: {
    path: '/notifications',
    component: Notifications,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Categories: {
    path: ['/categories', '/categories/:id'],
    component: Categories,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  ...TargetRoutes,
  ...FeedRoutes,
  ...VendorRoutes,
  ...TeamRoutes,
};
