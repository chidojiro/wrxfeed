import { RouteItem } from '@/routing/types';
import React from 'react';
import * as Sentry from '@sentry/react';
import { UserRole } from '@/auth/constants';

const ForYouFeedsPage = React.lazy(() =>
  import(/* webpackPreload: true */ './ForYouFeedsPage').then(({ ForYouFeedsPage }) => ({
    default: ForYouFeedsPage,
  })),
);

const ForYouFeedsByCategoryPage = React.lazy(() =>
  import(/* webpackPreload: true */ './ForYouFeedsByCategoryPage').then(
    ({ ForYouFeedsByCategoryPage }) => ({
      default: ForYouFeedsByCategoryPage,
    }),
  ),
);

const CompanyFeedsPage = React.lazy(() =>
  import(/* webpackPreload: true */ './CompanyFeedsPage').then(({ CompanyFeedsPage }) => ({
    default: CompanyFeedsPage,
  })),
);

const CompanyFeedsByCategoryPage = React.lazy(() =>
  import(/* webpackPreload: true */ './CompanyFeedsByCategoryPage').then(
    ({ CompanyFeedsByCategoryPage }) => ({
      default: CompanyFeedsByCategoryPage,
    }),
  ),
);

export const FeedRoutes: Record<string, RouteItem> = {
  ForYouFeedsByCategory: {
    path: '/feeds/for-you/category/:categoryId',
    component: Sentry.withProfiler(ForYouFeedsByCategoryPage, {
      name: 'ForYouFeedsByCategoryPage',
    }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  ForYouFeeds: {
    path: '/feeds/for-you',
    component: Sentry.withProfiler(ForYouFeedsPage, { name: 'ForYouFeedsPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  CompanyFeedsByCategory: {
    path: '/feeds/company/category/:categoryId',
    component: Sentry.withProfiler(CompanyFeedsByCategoryPage, {
      name: 'CompanyFeedsByCategoryPage',
    }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  CompanyFeeds: {
    path: '/feeds/company',
    component: Sentry.withProfiler(CompanyFeedsPage, { name: 'CompanyFeedsPage' }),
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
