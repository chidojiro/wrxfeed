import { AdminRoutes } from '@/admin/routes';
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

const LineItemPage = React.lazy(() =>
  import('@/main/pages/Feed/LineItem').then(({ LineItemPage }) => ({ default: LineItemPage })),
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
  },
  LineItem: {
    path: '/feed/item/:id',
    component: Sentry.withProfiler(LineItemPage, { name: 'LineItemPage' }),
  },
  Onboard: {
    path: '/onboarding',
    component: Sentry.withProfiler(OnboardPage, { name: 'OnboardPage' }),
  },
  Notifications: {
    path: '/notifications',
    component: Sentry.withProfiler(NotificationsPage, { name: 'NotificationsPage' }),
  },
  Categories: {
    path: ['/categories'],
    component: Sentry.withProfiler(CategoriesPage, { name: 'CategoriesPage' }),
  },
  ...TargetRoutes,
  ...FeedRoutes,
  ...VendorRoutes,
  ...TeamRoutes,
  ...AdminRoutes,
  ...CategoryRoutes,
};
