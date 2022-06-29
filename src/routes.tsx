import AcceptInvitation from '@/auth/pages/AcceptInvitation';
// Pages
import Login from '@/auth/pages/LoginPage';
import Onboard from '@/auth/pages/OnboardPage';
import NotFoundPage from '@/common/pages/NotFoundPage';
import { UserRole } from '@/identity/constants';
import Categories from '@/main/pages/Categories';
import Company from '@/main/pages/Company';
import Dashboard from '@/main/pages/Dashboard';
import Feed from '@/main/pages/Feed';
import ForYou from '@/main/pages/ForYou';
import Notifications from '@/main/pages/Notifications';
import Vendors from '@/main/pages/Vendors';
import { TeamPage } from '@/team/TeamPage';
import { TeamsPage } from '@/team/TeamsPage';
import { ComponentType } from 'react';

export interface RouteItem<T> {
  path: string | readonly string[];
  component: T;
  permissions?: string[];
}

export interface Route {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: RouteItem<ComponentType<any>>;
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
  Department: {
    path: ['/departments/:id'],
    component: TeamPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  Departments: {
    path: ['/departments'],
    component: TeamsPage,
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
  Dashboard: {
    path: '/dashboard',
    component: Dashboard,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};

export default routes;
