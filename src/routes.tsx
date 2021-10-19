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
  AcceptInvitation: {
    path: '/accept-invitation',
    component: lazy(() => import('@auth/pages/AcceptInvitation')),
  },
  // Protected pages
  Onboard: {
    path: '/onboarding',
    component: lazy(() => import('@auth/pages/OnboardPage')),
    permissions: ['admin'],
  },
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
  Departments: {
    path: '/departments',
    component: lazy(() => import('@main/pages/Departments')),
    permissions: ['admin'],
  },
  Categories: {
    path: '/categories',
    component: lazy(() => import('@main/pages/Categories')),
    permissions: ['admin'],
  },
  Vendors: {
    path: '/vendors',
    component: lazy(() => import('@main/pages/Vendors')),
    permissions: ['admin'],
  },
};

export default routes;
