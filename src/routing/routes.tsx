import { AdminRoutes } from '@/admin/routes';
import { UserRole } from '@/auth/constants';
import { CategoryRoutes } from '@/category/routes';
import { FeedRoutes } from '@/feed/routes';
import { TargetRoutes } from '@/target/routes';
import { TeamRoutes } from '@/team/routes';
import { VendorRoutes } from '@/vendor/routes';
import * as Sentry from '@sentry/react';
import React from 'react';
import { Route } from './types';

const CategoriesPage = React.lazy(() =>
  import('@/main/pages/Categories').then(({ CategoriesPage }) => ({ default: CategoriesPage })),
);

const NotificationsPage = React.lazy(() =>
  import('@/main/pages/Notifications').then(({ NotificationsPage }) => ({
    default: NotificationsPage,
  })),
);

const OnboardPage = React.lazy(() =>
  import('@/auth/pages/OnboardPage').then(({ OnboardPage }) => ({ default: OnboardPage })),
);

const FeedPage = React.lazy(() =>
  import('@/main/pages/Feed').then(({ FeedPage }) => ({ default: FeedPage })),
);

const LoginPage = React.lazy(() =>
  import('@/auth/pages/LoginPage').then(({ LoginPage }) => ({ default: LoginPage })),
);

const NotFoundPage = React.lazy(() =>
  import('@/auth/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
);

const AcceptInvitationPage = React.lazy(() =>
  import('@/auth/pages/AcceptInvitation').then(({ AcceptInvitationPage }) => ({
    default: AcceptInvitationPage,
  })),
);

export const Routes: Route = {
  // Public pages
  Login: {
    path: '/login',
    component: LoginPage,
  },
  AcceptInvitation: {
    path: '/accept-invitation',
    component: AcceptInvitationPage,
  },
  PageNotFound: {
    path: '/404',
    component: NotFoundPage,
  },
  // Protected pages
  Feed: {
    path: '/feed/:id',
    component: Sentry.withProfiler(FeedPage, { name: 'FeedPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Onboard: {
    path: '/onboarding',
    component: Sentry.withProfiler(OnboardPage, { name: 'OnboardPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Notifications: {
    path: '/notifications',
    component: Sentry.withProfiler(NotificationsPage, { name: 'NotificationsPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Categories: {
    path: ['/categories'],
    component: Sentry.withProfiler(CategoriesPage, { name: 'CategoriesPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  ...TargetRoutes,
  ...FeedRoutes,
  ...VendorRoutes,
  ...TeamRoutes,
  ...AdminRoutes,
  ...CategoryRoutes,
};
