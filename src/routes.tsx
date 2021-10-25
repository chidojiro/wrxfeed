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

// Pages
const Home = lazy(() => import('@main/pages/Landing'));
const Login = lazy(() => import('@auth/pages/LoginPage'));
const AcceptInvitation = lazy(() => import('@auth/pages/AcceptInvitation'));
const Onboard = lazy(() => import('@auth/pages/OnboardPage'));
const Overview = lazy(() => import('@main/pages/Overview'));
const Discussions = lazy(() => import('@main/pages/Discussion'));
const Departments = lazy(() => import('@main/pages/Departments'));
const Categories = lazy(() => import('@main/pages/Categories'));
const Vendors = lazy(() => import('@main/pages/Vendors'));

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
  Onboard: {
    path: '/onboarding',
    component: Onboard,
    permissions: ['admin'],
  },
  Overview: {
    path: '/overview',
    component: Overview,
    permissions: ['admin'],
  },
  Discussions: {
    path: '/discussions',
    component: Discussions,
    permissions: ['admin'],
  },
  Departments: {
    path: '/departments',
    component: Departments,
    permissions: ['admin'],
  },
  Categories: {
    path: '/categories',
    component: Categories,
    permissions: ['admin'],
  },
  Vendors: {
    path: '/vendors',
    component: Vendors,
    permissions: ['admin'],
  },
};

export default routes;
