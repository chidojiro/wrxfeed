import { ComponentType, lazy, LazyExoticComponent } from 'react';

export interface RouteItem<T extends ComponentType> {
  path: string;
  component: LazyExoticComponent<T>;
  permissions?: string[];
}

const routes: RouteItem<ComponentType>[] = [
  {
    path: '/',
    component: lazy(() => import('./diary/pages/ActivityListPage')),
    permissions: ['admin'],
  },
  {
    path: '/login',
    component: lazy(() => import('./auth/pages/LoginPage')),
  },
  {
    path: '/forgot-pwd',
    component: lazy(() => import('./auth/pages/ForgotPwdPage')),
  },
  {
    path: '/forgot-pwd/success',
    component: lazy(() => import('./auth/pages/ForgotPwdSuccessPage')),
  },
  {
    path: '/reset-pwd',
    component: lazy(() => import('./auth/pages/ResetPwdPage')),
  },
  {
    path: '/reset-pwd/success',
    component: lazy(() => import('./auth/pages/ResetPwdSuccessPage')),
  },
  {
    path: '/overview',
    component: lazy(() => import('./home/pages/OverviewPage')),
  },
  {
    path: '/profile',
    component: lazy(() => import('./auth/pages/ProfilePage')),
    permissions: ['admin'],
  },
  {
    path: '/profile/change-pwd',
    component: lazy(() => import('./auth/pages/ChangePwdPage')),
    permissions: ['admin'],
  },
  {
    path: '/activities/new',
    component: lazy(() => import('./diary/pages/AddActivityPage')),
    permissions: ['admin'],
  },
  {
    path: '/activities/edit/:id',
    component: lazy(() => import('./diary/pages/UpdateActivityPage')),
    permissions: ['admin'],
  },
];

export default routes;
