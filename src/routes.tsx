/* eslint-disable import/no-cycle */
import { UserRole } from '@identity/constants';
import { ComponentType } from 'react';
// Pages
import Login from '@auth/pages/LoginPage';
import AcceptInvitation from '@auth/pages/AcceptInvitation';

import Onboard from '@auth/pages/OnboardPage';
import ForYou from '@main/pages/ForYou';
import Departments from '@main/pages/Departments';
import Categories from '@main/pages/Categories';
import Vendors from '@main/pages/Vendors';
import Feed from '@main/pages/Feed';
import Notifications from '@main/pages/Notifications';
import Company from '@main/pages/Company';
import NotFoundPage from '@common/pages/NotFoundPage';

export interface RouteItem<T> {
  path: string | readonly string[];
  component: T;
  permissions?: string[];
}

export interface Route {
  [index: string]: RouteItem<ComponentType>;
}

const routes: Route = {
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
  ForYou: {
    path: '/for-you',
    component: ForYou,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Notifications: {
    path: '/notifications',
    component: Notifications,
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
  Company: {
    path: '/company',
    component: Company,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};

export default routes;
