/* eslint-disable import/no-cycle */
import { UserRole } from '@identity/constants';
import { ComponentType, lazy, LazyExoticComponent } from 'react';

export interface RouteItem<T extends ComponentType> {
  path: string | readonly string[];
  component: LazyExoticComponent<T>;
  permissions?: string[];
}

export interface Route {
  [index: string]: RouteItem<ComponentType>;
}

// Pages
const Home = lazy(() => import('@main/pages/Landing'));
const Login = lazy(() => import('@auth/pages/LoginPage'));
const AcceptInvitation = lazy(() => import('@auth/pages/AcceptInvitation'));

const Onboard = lazy(() => import('@auth/pages/OnboardPage'));
const Overview = lazy(() => import('@main/pages/Overview'));
const ForYou = lazy(() => import('@main/pages/ForYou'));
const Departments = lazy(() => import('@main/pages/Departments'));
const Categories = lazy(() => import('@main/pages/Categories'));
const Vendors = lazy(() => import('@main/pages/Vendors'));
const Feed = lazy(() => import('@main/pages/Feed'));

const routes: Route = {
  // Public pages
  Home: {
    path: '/',
    component: Home,
  },
  Login: {
    path: '/login',
    component: Login,
  },
  AcceptInvitation: {
    path: '/accept-invitation',
    component: AcceptInvitation,
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
  Overview: {
    path: '/overview',
    component: Overview,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  ForYou: {
    path: '/for-you',
    component: ForYou,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Departments: {
    path: ['/departments', '/departments/:id'],
    component: Departments,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Categories: {
    path: ['/categories', '/categories/:id'],
    component: Categories,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Vendors: {
    path: ['/vendors', '/vendors/:id'],
    component: Vendors,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};

export default routes;
