/* eslint-disable import/no-cycle */
import { ComponentType, lazy, LazyExoticComponent } from 'react';

export interface RouteItem<T extends ComponentType> {
  path: string;
  component: LazyExoticComponent<T>;
  permissions?: string[];
}

export interface Route {
  [index: string]: RouteItem<ComponentType>;
}

const routes: Route = {
  // Public pages
  Login: {
    path: '/login',
    component: lazy(() => import('@auth/pages/LoginPage')),
  },
  GoogleRedirect: {
    path: '/google/redirect',
    component: lazy(() => import('@auth/pages/AuthRedirect')),
  },
  // Protected pages
  Home: {
    path: '/',
    component: lazy(() => import('@main/pages/Overview')),
    permissions: ['admin'],
  },
  Overview: {
    path: '/overview',
    component: lazy(() => import('@main/pages/Overview')),
    permissions: ['admin'],
  },
  Discussions: {
    path: '/discussions',
    component: lazy(() => import('@main/pages/Discussion')),
    permissions: ['admin'],
  },
};

export default routes;
