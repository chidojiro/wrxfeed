import AcceptInvitation from '@/auth/pages/AcceptInvitation';
// Pages
import Login from '@/auth/pages/LoginPage';
import Onboard from '@/auth/pages/OnboardPage';
import NotFoundPage from '@/common/pages/NotFoundPage';
import { FeedRoutes } from '@/feed/routes';
import { UserRole } from '@/identity/constants';
import Categories from '@/main/pages/Categories';
import Company from '@/main/pages/Company';
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
  Company: {
    path: '/company',
    component: Company,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  ...TargetRoutes,
  ...FeedRoutes,
  ...VendorRoutes,
  ...TeamRoutes,
};
