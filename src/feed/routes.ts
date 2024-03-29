import { RouteItem } from '@/routing/types';
import React from 'react';
import * as Sentry from '@sentry/react';

const ForYouFeedsPage = React.lazy(() =>
  import('./ForYouFeedsPage').then(({ ForYouFeedsPage }) => ({
    default: ForYouFeedsPage,
  })),
);

const ForYouFeedsByCategoryPage = React.lazy(() =>
  import('./ForYouFeedsByCategoryPage').then(({ ForYouFeedsByCategoryPage }) => ({
    default: ForYouFeedsByCategoryPage,
  })),
);

const CompanyFeedsPage = React.lazy(() =>
  import('./CompanyFeedsPage').then(({ CompanyFeedsPage }) => ({
    default: CompanyFeedsPage,
  })),
);

const CompanyFeedsByCategoryPage = React.lazy(() =>
  import('./CompanyFeedsByCategoryPage').then(({ CompanyFeedsByCategoryPage }) => ({
    default: CompanyFeedsByCategoryPage,
  })),
);

export const FeedRoutes: Record<string, RouteItem> = {
  ForYouFeedsByCategory: {
    path: '/feeds/for-you/category/:categoryId',
    component: Sentry.withProfiler(ForYouFeedsByCategoryPage, {
      name: 'ForYouFeedsByCategoryPage',
    }),
  },
  ForYouFeeds: {
    path: '/feeds/for-you',
    component: Sentry.withProfiler(ForYouFeedsPage, { name: 'ForYouFeedsPage' }),
  },
  CompanyFeedsByCategory: {
    path: '/feeds/company/category/:categoryId',
    component: Sentry.withProfiler(CompanyFeedsByCategoryPage, {
      name: 'CompanyFeedsByCategoryPage',
    }),
  },
  CompanyFeeds: {
    path: '/feeds/company',
    component: Sentry.withProfiler(CompanyFeedsPage, { name: 'CompanyFeedsPage' }),
  },
};
